import { Context } from 'telegraf';
import * as Faker from 'faker';
import { FAKER_COMMANDS } from './Fake';
import { KEYBOARD, MESSAGE } from './Menu';

export class Handlers {
  static ctx: Context;
  static menuMessageId: number;
  static ChatId: number;

  public static async START(ctx: Context): Promise<any> {
    const menuMessage = await ctx.reply(MESSAGE.START, KEYBOARD.START);
    this.ctx = ctx;
    this.menuMessageId = menuMessage.message_id;
    this.ChatId = menuMessage.chat.id;

    return await ctx.reply(`${MESSAGE.START}\nMenu:`, KEYBOARD.FAKER_COMMANDS);
  }

  public static async FAKER_COMMANDS(ctx: any, text?: string): Promise<any> {
    const message = text ?? ctx.message.text;
    const [command, method, ...args] = message?.replace('/', '')?.split(' ');
    const result = Faker?.[command]?.[method]?.(...args) ?? 'Invalid Command: ';

    return await ctx.reply(`${result}`, KEYBOARD.FAKER_COMMAND_METHODS(command));
  }

  public static async RANDOM_IMAGE(ctx: Context): Promise<any> {
    return await ctx.reply(Faker.image.imageUrl(), KEYBOARD.RANDOM_IMAGE);
  }

  public static async RANDOM_IMAGE_MANY(ctx: Context): Promise<any> {
    await Promise.all(
      Array(9)
        .fill(1)
        .map(async () => await ctx.reply(Faker.image.imageUrl())),
    );
    return await this.RANDOM_IMAGE(ctx);
  }

  public static async RANDOM_DATA(ctx: Context): Promise<any> {
    const data = Faker.helpers.contextualCard();
    return await ctx.reply(JSON.stringify(data, null, '\t'), KEYBOARD.RANDOM_DATA);
  }

  public static async TEST(ctx: Context): Promise<any> {
    return await ctx.reply(MESSAGE.TEST, KEYBOARD.TEST);
  }

  public static async RESET(ctx: Context): Promise<any> {
    return await ctx.reply(MESSAGE.RESET, KEYBOARD.RESET);
  }

  public static async MAIN(ctx: Context): Promise<any> {
    return await ctx.reply(MESSAGE.MAIN, KEYBOARD.MAIN);
  }

  public static async HELP(ctx: Context): Promise<any> {
    return await ctx.reply(MESSAGE.HELP, KEYBOARD.HELP);
  }

  public static async FAKER_HELP(ctx: Context): Promise<any> {
    return await ctx.reply(MESSAGE.FAKER_HELP, KEYBOARD.HELP);
  }

  public static async SETTINGS(ctx: Context): Promise<any> {
    return await ctx.reply(MESSAGE.SETTINGS, KEYBOARD.SETTINGS);
  }

  public static async PROFILE(ctx: Context): Promise<any> {
    return await ctx.reply(MESSAGE.PROFILE, KEYBOARD.PROFILE);
  }
}
