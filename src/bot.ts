import { config } from 'dotenv';
config();

import { Telegraf } from 'telegraf';
import { FAKER_COMMANDS } from './Fake';
import { Handlers } from './Handlers';
import { BOT_ACTION } from './interfaces';

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.use(Telegraf.log());

//! >>> Bot Commands <<<
bot.action(BOT_ACTION.TEST, Handlers.TEST);
bot.action(BOT_ACTION.START, Handlers.START);
bot.action(BOT_ACTION.RESET, Handlers.RESET);
bot.action(BOT_ACTION.MAIN, Handlers.MAIN);
bot.action(BOT_ACTION.HELP, Handlers.HELP);
bot.action(BOT_ACTION.SETTINGS, Handlers.SETTINGS);
bot.action(BOT_ACTION.PROFILE, Handlers.PROFILE);
bot.action(BOT_ACTION.RANDOM_IMAGE, Handlers.RANDOM_IMAGE);
bot.action(BOT_ACTION.RANDOM_IMAGE_MANY, Handlers.RANDOM_IMAGE_MANY);
bot.action(BOT_ACTION.RANDOM_DATA, Handlers.RANDOM_DATA);
bot.action(BOT_ACTION.FAKER_HELP, Handlers.FAKER_HELP);
bot.on('callback_query', async (ctx: any) => await Handlers.FAKER_COMMANDS(ctx, ctx.update.callback_query.data));

//! >>> Bot Commands <<<
bot.command(BOT_ACTION.TEST, Handlers.TEST);
bot.command(BOT_ACTION.START, Handlers.START);
bot.command(BOT_ACTION.RESET, Handlers.RESET);
bot.command(BOT_ACTION.MAIN, Handlers.MAIN);
bot.command(BOT_ACTION.HELP, Handlers.HELP);
bot.command(BOT_ACTION.SETTINGS, Handlers.SETTINGS);
bot.command(BOT_ACTION.PROFILE, Handlers.PROFILE);
bot.command(BOT_ACTION.RANDOM_IMAGE, Handlers.RANDOM_IMAGE);
bot.command(BOT_ACTION.RANDOM_IMAGE_MANY, Handlers.RANDOM_IMAGE_MANY);
bot.command(BOT_ACTION.RANDOM_DATA, Handlers.RANDOM_DATA);
bot.command(BOT_ACTION.FAKER_HELP, Handlers.FAKER_HELP);
bot.command(FAKER_COMMANDS, async (ctx) => await Handlers.FAKER_COMMANDS(ctx));

const init = async (): Promise<void> => {
  bot.launch();
  bot.catch((err) => console.error(err));

  console.log('Bot Ready');
};

init();
