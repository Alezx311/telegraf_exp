import { BOT_ACTION, BOT_COMMANDS_VERBOSE, CallbackButton, CallbackButtonProps, MarkupButtonProps } from './interfaces';
import { Markup } from 'telegraf';
import { FAKER_COMMANDS, FAKER_COMMAND_METHODS } from './Fake';

export const COMMANDS = Object.values(BOT_ACTION)
  .map((str) => `/${str}`)
  .join('\n');

export const toTitle = (str, text) => {
  const title = `### ${str} ###`;
  const divider = '#'.repeat(~~title?.length);
  return `${divider}\n${title}\n${divider}\n${text}`;
};

export const CREATE_BUTTON = (text: string, props?: CallbackButtonProps): CallbackButton => ({
  text,
  callback_data: props?.callback_data ?? text,
});
export const CREATE_MENU = (btns: string[]) =>
  Markup.inlineKeyboard([...btns.map((v) => CREATE_BUTTON(v)), BUTTON.MAIN], { columns: 3 });
export const MESSAGE = {
  HELP: toTitle('HELP', BOT_COMMANDS_VERBOSE),
  FAKER_HELP: toTitle('FAKER_HELP', FAKER_COMMANDS.map((c) => `/${c}`).join('\n')),
  MAIN: toTitle('MAIN', ''),
  SETTINGS: toTitle('SETTINGS', ''),
  PROFILE: toTitle('PROFILE', ''),
  RESET: toTitle('RESET', ''),
  START: toTitle('START', ''),
  TEST: toTitle('TEST', ''),
};

export const BUTTON = {
  MAIN: CREATE_BUTTON(`Main`, { callback_data: BOT_ACTION.MAIN }),
  HELP: CREATE_BUTTON(`Help`, { callback_data: BOT_ACTION.HELP }),
  SETTINGS: CREATE_BUTTON(`Settings`, { callback_data: BOT_ACTION.SETTINGS }),
  PROFILE: CREATE_BUTTON(`Profile`, { callback_data: BOT_ACTION.PROFILE }),
  RESET: CREATE_BUTTON(`Reset`, { callback_data: BOT_ACTION.RESET }),
  START: CREATE_BUTTON(`Start`, { callback_data: BOT_ACTION.START }),
  TEST: CREATE_BUTTON(`Test`, { callback_data: BOT_ACTION.TEST }),
  RANDOM_IMAGE: CREATE_BUTTON(`Random Image`, { callback_data: BOT_ACTION.RANDOM_IMAGE }),
  RANDOM_IMAGE_MANY: CREATE_BUTTON(`Random Image(10)`, { callback_data: BOT_ACTION.RANDOM_IMAGE_MANY }),
  RANDOM_DATA: CREATE_BUTTON(`Random Data`, { callback_data: BOT_ACTION.RANDOM_DATA }),
};

export const BUTTONS_FAKER_COMMANDS = FAKER_COMMANDS.map((text) => CREATE_BUTTON(text, { callback_data: `/${text}` }));
export const KEYBOARD = {
  SHOW_MAIN: Markup.inlineKeyboard([BUTTON.MAIN]),
  MAIN: Markup.inlineKeyboard([BUTTON.HELP, BUTTON.SETTINGS, BUTTON.PROFILE, BUTTON.MAIN]),
  HELP: Markup.inlineKeyboard([BUTTON.HELP, BUTTON.MAIN]),
  SETTINGS: Markup.inlineKeyboard([BUTTON.SETTINGS, BUTTON.MAIN]),
  PROFILE: Markup.inlineKeyboard([BUTTON.PROFILE, BUTTON.MAIN]),
  RESET: Markup.inlineKeyboard([BUTTON.RESET, BUTTON.MAIN]),
  START: Markup.inlineKeyboard([BUTTON.START, BUTTON.MAIN]),
  TEST: Markup.inlineKeyboard([BUTTON.TEST, BUTTON.MAIN]),
  RANDOM_IMAGE: Markup.inlineKeyboard([BUTTON.RANDOM_IMAGE, BUTTON.RANDOM_IMAGE_MANY, BUTTON.MAIN]),
  RANDOM_DATA: Markup.inlineKeyboard([BUTTON.RANDOM_DATA, BUTTON.MAIN]),
  FAKER_COMMANDS: Markup.inlineKeyboard(BUTTONS_FAKER_COMMANDS, { columns: 3 }),
  FAKER_COMMAND_METHODS: (command) => {
    const keys = FAKER_COMMAND_METHODS(command);
    const buttons = keys.map((k) => CREATE_BUTTON(k, { callback_data: `/${command} ${k}` }));
    return Markup.inlineKeyboard(buttons, { columns: 3 });
  },
};
