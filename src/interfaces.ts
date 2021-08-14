import { ParseMode } from 'typegram';

export enum BOT_ACTION {
  TEST = 'test',
  START = 'start',
  RESET = 'reset',
  MAIN = 'main',
  HELP = 'help',
  SETTINGS = 'settings',
  PROFILE = 'profile',
  RANDOM_IMAGE = 'random_image',
  RANDOM_IMAGE_MANY = 'random_image_many',
  RANDOM_DATA = 'random_data',
  RANDOM_TEXT = 'random_text',
  FAKER_HELP = 'random_help',
}

export interface CallbackButton {
  text: string;
  callback_data: string;
}
export type CallbackButtonProps = Pick<CallbackButton, 'callback_data'>;

export const BOT_COMMANDS_VERBOSE = `\n\tBot Commands List\t\n
/test -> Show test menu
/start -> Show start menu
/reset -> Show reset menu
/main -> Show main menu
/help -> Show help menu
/settings -> Show settings menu
/profile -> Show profile menu
/random_image -> Show random_image menu
/random_image_many -> Show random_images menu
/random_data -> Show random_data menu
/random_text -> Show random_text menu
/random_number -> Show random_numbers menu
/random_help -> Show random commands
`;

export interface MarkupButtonProps {
  title: string;
  callback: BOT_ACTION;
  hide?: boolean;
}

export interface MarkupKeyboardProps {
  buttons: MarkupButtonProps[];
  parse_mode?: ParseMode;
}

export interface MarkupMessageProps {
  message: string;
  parse_mode?: ParseMode;
}
