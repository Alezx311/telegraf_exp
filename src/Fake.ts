import * as Faker from 'faker';

export const FAKER_COMMANDS = Object.keys(Faker);
export const FAKER_COMMAND_METHODS = (cmd) => Object.keys(Faker?.[cmd]);
