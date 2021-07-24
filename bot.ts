//* ##### Environment #####;
import { config } from 'dotenv';
config();

//* ##### Dependencies #####
import { Telegraf } from 'telegraf';
import { default as axios } from 'axios';

//* ##### Variables #####
const { QUOTES_API_URL, QUOTES_API_KEY, BOT_TOKEN } = process.env;
const QUOTES_API_LIVE = `${QUOTES_API_URL}/live?access_key=${QUOTES_API_KEY}&format=1`;

//* ##### State #####
const INITIAL_STATE = {
  currencies: ['UAH', 'EUR', 'RUB', 'BTC', 'ETH', 'DOGE'],
  timestamp: Date.now(),
  source: 'USD',
  user_currency: 'UAH',
  counter: 0,
  quotes: null,
  pretty: null,
  success: false,
};
const state = { ...INITIAL_STATE };
const stateReducer = (upd = {}) => Object.assign(state, upd);

//* ##### Helpers & Misc #####
const toTitle = (str) => `\n\t----------\t\n\t${str}\t\n\t----------\t\n`;
const toJSON = (obj = {}) => JSON.stringify(obj, null, '\t');
const toLog = (title = 'New Log', obj = {}, type = 'log') =>
  console?.[type](`${toTitle(title)}${toJSON(obj)}`);
const objEach = (obj, f) => Object.fromEntries(Object.entries(obj).map(f));

//* ##### Messages #####
const MESSAGES = {
  MAIN: `${toTitle('Main Menu')}\n${toJSON(state)}`,
  HELP: `${toTitle('Help')}

Convert value: Just type value to convert it to USD.
Source currency is "USD" by default, but you can change it, by add it after space.
Examples: "1274", "311 EUR", "22367 UAH".

Commands:\n/start\n/main\n/help\n/settings\n/quotes\n/reset`,
  SETTINGS: toTitle('Settings'),
  QUOTES: toTitle('Currency Quotes'),
  CONVERT: toTitle(`Converted from ${state.user_currency}`),
};

//* ##### Telegram Buttons #####
const BUTTON = {
  MAIN: [{ text: 'Main', callback_data: 'action_MAIN' }],
  HELP: [{ text: 'Help', callback_data: 'action_HELP' }],
  SETTINGS: [{ text: 'Settings', callback_data: 'action_SETTINGS' }],
  QUOTES: [{ text: 'Quotes', callback_data: 'action_QUOTES' }],
  RESET: [{ text: 'Reset', callback_data: 'action_RESET' }],
};

//* ##### Create Telegram Keyboard #####
const KEYBOARD = (buttons) => ({
  reply_markup: { remove_keyboard: true, inline_keyboard: buttons },
});
//* ##### Create Reply, for clean code #####
const REPLY = async (ctx, msg, kb = KEYBOARD([BUTTON.MAIN])) =>
  await ctx.reply(msg, kb);

//* ##### Telegram Action Handlers #####
class HANDLERS {
  public static async onMain(ctx) {
    const msg = toTitle(`Hi, ${ctx.from.username}!`);
    const kb = KEYBOARD([BUTTON.QUOTES, BUTTON.SETTINGS, BUTTON.HELP]);

    return await REPLY(ctx, msg, kb);
  }

  public static async onStart(ctx) {
    return await HANDLERS.onMain(ctx);
  }

  public static async onHelp(ctx) {
    const msg = MESSAGES.HELP;
    const kb = KEYBOARD([BUTTON.QUOTES, BUTTON.SETTINGS]);

    return await REPLY(ctx, msg, kb);
  }

  public static async onSettings(ctx) {
    const msg = MESSAGES.SETTINGS;
    const kb = KEYBOARD([BUTTON.MAIN, BUTTON.RESET]);

    return await REPLY(ctx, msg, kb);
  }

  public static async onConvert(ctx) {
    const [value, user_currency = state.user_currency] = ctx.message.text
      ?.toUpperCase()
      ?.trim()
      ?.split(' ');

    if (state.source === user_currency) {
      return await REPLY(
        ctx,
        `${value} ${state.user_currency} -> ${value} ${state.source}`,
      );
    }

    if (state.user_currency !== user_currency) {
      stateReducer({ user_currency });
    }

    if (!state.quotes) {
      const { data } = await axios.get(QUOTES_API_LIVE);
      stateReducer(data);
    }

    const currencyName = `${state.source}${state.user_currency}`
      ?.trim()
      ?.toUpperCase();
    const quote = state.quotes?.[currencyName];
    if (!quote) return await REPLY(ctx, 'Unknown currency');

    const result = (value / quote).toFixed(2);
    const msg = `${value} ${state.user_currency} -> ${result} ${state.source}`;
    const kb = KEYBOARD([BUTTON.MAIN, BUTTON.QUOTES, BUTTON.SETTINGS]);

    return await REPLY(ctx, msg, kb);
  }

  public static async onQuotes(ctx) {
    const { currencies } = state;
    const url = `${QUOTES_API_LIVE}&currencies=${currencies}`;
    //? Send Request
    const { data } = await axios.get(url);
    if (data?.success !== true) {
      toLog('Invalid Quotes response', data, 'error');
      return ctx.editMessageText('Invalid Quotes response');
    }
    //? Prettify quotes
    const pretty = objEach(data.quotes, ([k, v]) => [
      `${k}`.replace(state.source, `${state.source}/`),
      v,
    ]);
    //? Update state
    stateReducer({ pretty, ...data });
    //? Create Message and Keyboard
    console.log(data);
    const time = toTitle(
      `Updated on: ${new Date(data.timestamp * 1000).toISOString()}`,
    );
    const values = toTitle(`Quotes: ${toJSON(pretty)}`);
    const msg = `${toTitle('Updated Quotes')} ${time} ${values}`;
    const kb = KEYBOARD([BUTTON.MAIN, BUTTON.RESET]);
    //? Reply to user
    return await REPLY(ctx, msg, kb);
  }

  public static async onReset(ctx) {
    stateReducer(INITIAL_STATE);
    return await HANDLERS.onStart(ctx);
  }
}

//* ##### Telegram Bot Init #####
const bot = new Telegraf(BOT_TOKEN);

bot.catch((err) => console.error(err));
bot.use(async (ctx, next) => {
  toLog('Context update', ctx.update);
  await next();
});

bot.command(['start', 'main'], HANDLERS.onMain);
bot.command('help', HANDLERS.onHelp);
bot.command('settings', HANDLERS.onSettings);
bot.command('quotes', HANDLERS.onQuotes);
bot.command('reset', HANDLERS.onReset);

bot.hears(/^\d/i, HANDLERS.onConvert);

bot.action('action_MAIN', HANDLERS.onMain);
bot.action('action_SETTINGS', HANDLERS.onSettings);
bot.action('action_QUOTES', HANDLERS.onQuotes);
bot.action('action_RESET', HANDLERS.onReset);
bot.action('action_HELP', HANDLERS.onHelp);

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
