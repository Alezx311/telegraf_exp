import { Markup } from 'telegraf';
import { MarkupButtonProps, MarkupKeyboardProps, MarkupMessageProps } from './interfaces';

export class Create {
  public static Message({ message }: MarkupMessageProps) {
    return `${message}`;
  }

  public static Button({ title, callback, hide = false }: MarkupButtonProps) {
    return Markup.button.callback(title, callback, hide);
  }

  public static InlineKeyboard({ buttons, parse_mode = 'HTML' }: MarkupKeyboardProps) {
    return { ...Markup.inlineKeyboard(buttons.map(this.Button)), parse_mode };
  }
}
