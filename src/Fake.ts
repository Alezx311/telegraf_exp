import * as Faker from 'faker';

export const enum FAKER_ENUM {
  ADDRESS = 'address',
  COMMERCE = 'commerce',
  COMPANY = 'company',
  DATABASE = 'database',
  DATATYPE = 'datatype',
  DATE = 'date',
  FINANCE = 'finance',
  GIT = 'git',
  HACKER = 'hacker',
  HELPERS = 'helpers',
  IMAGE = 'image',
  INTERNET = 'internet',
  LOREM = 'lorem',
  NAME = 'name',
  MUSIC = 'music',
  PHONE = 'phone',
  RANDOM = 'random',
  SYSTEM = 'system',
  TIME = 'time',
  VEHICLE = 'vehicle',
}

export const FAKER_COMMANDS = [
  'address',
  'commerce',
  'company',
  'database',
  'datatype',
  'date',
  'finance',
  'git',
  'hacker',
  'helpers',
  'image',
  'internet',
  'lorem',
  'name',
  'music',
  'phone',
  'random',
  'system',
  'time',
  'vehicle',
];

export const FAKER_ACTIONS = {
  address: {
    zipCodeByState: (state: string): string => Faker.address.zipCodeByState(state),
    zipCode: (format?: string): string => Faker.address.zipCode(format),
    city: (format?: string): string => Faker.address.city(format),
    cityName: (): string => Faker.address.cityName(),
    cityPrefix: (): string => Faker.address.cityPrefix(),
    citySuffix: (): string => Faker.address.citySuffix(),
    streetName: (): string => Faker.address.streetName(),
    streetAddress: (useFullAddress?: boolean): string => Faker.address.streetAddress(useFullAddress),
    streetSuffix: (): string => Faker.address.streetSuffix(),
    streetPrefix: (): string => Faker.address.streetPrefix(),
    secondaryAddress: (): string => Faker.address.secondaryAddress(),
    county: (): string => Faker.address.county(),
    country: (): string => Faker.address.country(),
    countryCode: (alphaCode?: string): string => Faker.address.countryCode(alphaCode),
    state: (useAbbr?: boolean): string => Faker.address.state(useAbbr),
    stateAbbr: (): string => Faker.address.stateAbbr(),
    latitude: (max?: number, min?: number, precision?: number): string => Faker.address.latitude(max, min, precision),
    longitude: (max?: number, min?: number, precision?: number): string => Faker.address.longitude(max, min, precision),
    direction: (useAbbr?: boolean): string => Faker.address.direction(useAbbr),
    cardinalDirection: (useAbbr?: boolean): string => Faker.address.cardinalDirection(useAbbr),
    ordinalDirection: (useAbbr?: boolean): string => Faker.address.ordinalDirection(useAbbr),
    nearbyGPSCoordinate: (coordinate?: ReadonlyArray<number | string>, radius?: number, isMetric?: boolean): string[] =>
      Faker.address.nearbyGPSCoordinate(coordinate, radius, isMetric),
    timeZone: (): string => Faker.address.timeZone(),
  },

  commerce: {
    color: (): string => Faker.commerce.color(),
    department: (): string => Faker.commerce.department(),
    productName: (): string => Faker.commerce.productName(),
    price: (min?: number, max?: number, dec?: number, symbol?: string): string =>
      Faker.commerce.price(min, max, dec, symbol),
    productAdjective: (): string => Faker.commerce.productAdjective(),
    productMaterial: (): string => Faker.commerce.productMaterial(),
    product: (): string => Faker.commerce.product(),
    productDescription: (): string => Faker.commerce.productDescription(),
  },

  company: {
    companyName: (format?: number): string => Faker.company.companyName(format),
    suffixes: (): string[] => Faker.company.suffixes(),
    companySuffix: (): string => Faker.company.companySuffix(),
    catchPhrase: (): string => Faker.company.catchPhrase(),
    bs: (): string => Faker.company.bs(),
    catchPhraseAdjective: (): string => Faker.company.catchPhraseAdjective(),
    catchPhraseDescriptor: (): string => Faker.company.catchPhraseDescriptor(),
    catchPhraseNoun: (): string => Faker.company.catchPhraseNoun(),
    bsAdjective: (): string => Faker.company.bsAdjective(),
    bsBuzz: (): string => Faker.company.bsBuzz(),
    bsNoun: (): string => Faker.company.bsNoun(),
  },

  database: {
    column: (): string => Faker.database.column(),
    type: (): string => Faker.database.type(),
    collation: (): string => Faker.database.collation(),
    engine: (): string => Faker.database.engine(),
  },

  datatype: {
    number: (options?: {
      min?: number | undefined;
      max?: number | undefined;
      precision?: number | undefined;
    }): number => Faker.datatype.number(options),
    float: (options?: { min?: number | undefined; max?: number | undefined; precision?: number | undefined }): number =>
      Faker.datatype.float(options),
    datetime: (options?: { min?: number | undefined; max?: number | undefined }): Date =>
      Faker.datatype.datetime(options),
    string: (length?: number): string => Faker.datatype.string(length),
    uuid: (): string => Faker.datatype.uuid(),
    boolean: (): boolean => Faker.datatype.boolean(),
    hexaDecimal: (count?: number): string => Faker.datatype.hexaDecimal(count),
    json: (): string => Faker.datatype.json(),
    array: (length?: number): Array<string | number> => Faker.datatype.array(length),
  },

  date: {
    past: (years?: number, refDate?: string | Date): Date => Faker.date.past(years, refDate),
    future: (years?: number, refDate?: string | Date): Date => Faker.date.future(years, refDate),
    between: (from: string | number | Date, to: string | Date): Date => Faker.date.between(from, to),
    recent: (days?: number, refDate?: string | Date): Date => Faker.date.recent(days, refDate),
    soon: (days?: number, refDate?: string | Date): Date => Faker.date.soon(days, refDate),
    month: (options?: { abbr?: boolean | undefined; context?: boolean | undefined }): string =>
      Faker.date.month(options),
    weekday: (options?: { abbr?: boolean | undefined; context?: boolean | undefined }): string =>
      Faker.date.weekday(options),
  },

  finance: {
    account: () => Faker.finance.account(),
    accountName: () => Faker.finance.accountName(),
    routingNumber: () => Faker.finance.routingNumber(),
    mask: () => Faker.finance.mask(),
    amount: () => Faker.finance.amount(),
    transactionType: () => Faker.finance.transactionType(),
    currencyCode: () => Faker.finance.currencyCode(),
    currencyName: () => Faker.finance.currencyName(),
    currencySymbol: () => Faker.finance.currencySymbol(),
    bitcoinAddress: () => Faker.finance.bitcoinAddress(),
    iban: () => Faker.finance.iban(),
    bic: () => Faker.finance.bic(),
    litecoinAddress: () => Faker.finance.litecoinAddress(),
    creditCardNumber: () => Faker.finance.creditCardNumber(),
    creditCardCVV: () => Faker.finance.creditCardCVV(),
    ethereumAddress: () => Faker.finance.ethereumAddress(),
    transactionDescription: () => Faker.finance.transactionDescription(),
  },

  git: {
    branch: () => Faker.git.branch(),
    commitEntry: () => Faker.git.commitEntry(),
    commitMessage: () => Faker.git.commitMessage(),
    commitSha: () => Faker.git.commitSha(),
    shortSha: () => Faker.git.shortSha(),
  },

  hacker: {
    abbreviation: () => Faker.hacker.abbreviation(),
    adjective: () => Faker.hacker.adjective(),
    noun: () => Faker.hacker.noun(),
    verb: () => Faker.hacker.verb(),
    ingverb: () => Faker.hacker.ingverb(),
    phrase: () => Faker.hacker.phrase(),
  },

  helpers: {
    randomize: () => Faker.helpers.randomize(),
    slugify: () => Faker.helpers.slugify(),
    replaceSymbolWithNumber: () => Faker.helpers.replaceSymbolWithNumber(),
    replaceSymbols: () => Faker.helpers.replaceSymbols(),
    replaceCreditCardSymbols: () => Faker.helpers.replaceCreditCardSymbols(),
    repeatString: (str, num) => Faker.helpers.repeatString(str, num),
    regexpStyleStringParse: (str) => Faker.helpers.regexpStyleStringParse(str),
    shuffle: () => Faker.helpers.shuffle(),
    mustache: (str, data) => Faker.helpers.mustache(str, data),
    createCard: () => Faker.helpers.createCard(),
    contextualCard: () => Faker.helpers.contextualCard(),
    userCard: () => Faker.helpers.userCard(),
    createTransaction: () => Faker.helpers.createTransaction(),
  },

  image: {
    image: () => Faker.image.image(),
    avatar: () => Faker.image.avatar(),
    imageUrl: () => Faker.image.imageUrl(),
    abstract: () => Faker.image.abstract(),
    animals: () => Faker.image.animals(),
    business: () => Faker.image.business(),
    cats: () => Faker.image.cats(),
    city: () => Faker.image.city(),
    food: () => Faker.image.food(),
    nightlife: () => Faker.image.nightlife(),
    fashion: () => Faker.image.fashion(),
    people: () => Faker.image.people(),
    nature: () => Faker.image.nature(),
    sports: () => Faker.image.sports(),
    technics: () => Faker.image.technics(),
    transport: () => Faker.image.transport(),
    dataUri: () => Faker.image.dataUri(),
  },

  internet: {
    avatar: () => Faker.internet.avatar(),
    email: () => Faker.internet.email(),
    exampleEmail: () => Faker.internet.exampleEmail(),
    userName: () => Faker.internet.userName(),
    protocol: () => Faker.internet.protocol(),
    url: () => Faker.internet.url(),
    domainName: () => Faker.internet.domainName(),
    domainSuffix: () => Faker.internet.domainSuffix(),
    domainWord: () => Faker.internet.domainWord(),
    ip: () => Faker.internet.ip(),
    ipv6: () => Faker.internet.ipv6(),
    port: () => Faker.internet.port(),
    userAgent: () => Faker.internet.userAgent(),
    color: () => Faker.internet.color(),
    mac: () => Faker.internet.mac(),
    password: () => Faker.internet.password(),
  },

  lorem: {
    word: () => Faker.lorem.word(),
    words: () => Faker.lorem.words(),
    sentence: () => Faker.lorem.sentence(),
    slug: () => Faker.lorem.slug(),
    sentences: () => Faker.lorem.sentences(),
    paragraph: () => Faker.lorem.paragraph(),
    paragraphs: () => Faker.lorem.paragraphs(),
    text: () => Faker.lorem.text(),
    lines: () => Faker.lorem.lines(),
  },
  name: {
    firstName: () => Faker.name.firstName(),
    lastName: () => Faker.name.lastName(),
    middleName: () => Faker.name.middleName(),
    findName: () => Faker.name.findName(),
    jobTitle: () => Faker.name.jobTitle(),
    gender: () => Faker.name.gender(),
    prefix: () => Faker.name.prefix(),
    suffix: () => Faker.name.suffix(),
    title: () => Faker.name.title(),
    jobDescriptor: () => Faker.name.jobDescriptor(),
    jobArea: () => Faker.name.jobArea(),
    jobType: () => Faker.name.jobType(),
  },

  music: {
    genre: () => Faker.music.genre(),
  },

  phone: {
    phoneNumber: () => Faker.phone.phoneNumber(),
    phoneNumberFormat: () => Faker.phone.phoneNumberFormat(),
    phoneFormats: () => Faker.phone.phoneFormats(),
  },

  random: {
    arrayElement: () => Faker.random.arrayElement(),
    arrayElements: () => Faker.random.arrayElements(),
    word: () => Faker.random.word(),
    words: () => Faker.random.words(),
    image: () => Faker.random.image(),
    locale: () => Faker.random.locale(),
    alpha: () => Faker.random.alpha(),
    alphaNumeric: () => Faker.random.alphaNumeric(),
  },
  system: {
    fileName: () => Faker.system.fileName(),
    commonFileName: () => Faker.system.commonFileName(),
    mimeType: () => Faker.system.mimeType(),
    commonFileType: () => Faker.system.commonFileType(),
    commonFileExt: () => Faker.system.commonFileExt(),
    fileType: () => Faker.system.fileType(),
    fileExt: () => Faker.system.fileExt(),
    directoryPath: () => Faker.system.directoryPath(),
    filePath: () => Faker.system.filePath(),
    semver: () => Faker.system.semver(),
  },

  time: {
    recent: () => Faker.time.recent(),
  },

  vehicle: {
    vehicle: () => Faker.vehicle.vehicle(),
    manufacturer: () => Faker.vehicle.manufacturer(),
    model: () => Faker.vehicle.model(),
    type: () => Faker.vehicle.type(),
    fuel: () => Faker.vehicle.fuel(),
    vin: () => Faker.vehicle.vin(),
    color: () => Faker.vehicle.color(),
    vrm: () => Faker.vehicle.vrm(),
    bicycle: () => Faker.vehicle.bicycle(),
  },
};

export const parseArgs = (str) => str?.split(',').filter((s) => s?.trim());
export const showCommands = () => FAKER_COMMANDS.map((cmd) => `/${cmd} (method)`).join('\n');
export const showCommandHelp = (command) => Object.keys(FAKER_ACTIONS?.[command]).join('\n');

export class FakerHelper {
  constructor() {}

  //^ >>> RANDOM <<<
  random_arrayElement = () => Faker.random.arrayElement();
  random_arrayElements = () => Faker.random.arrayElements();
  random_objectElement = () => Faker.random.objectElement();
  random_word = () => Faker.random.word();
  random_words = () => Faker.random.words();
  random_image = () => Faker.random.image();
  random_locale = () => Faker.random.locale();
  random_alpha = () => Faker.random.alpha();
  random_alphaNumeric = () => Faker.random.alphaNumeric();

  //^ >>> DATATYPE <<<
  data_number = () => Faker.datatype.number();
  data_float = () => Faker.datatype.float();
  data_datetime = () => Faker.datatype.datetime();
  data_string = () => Faker.datatype.string();
  data_uuid = () => Faker.datatype.uuid();
  data_boolean = () => Faker.datatype.boolean();
  data_hexaDecimal = () => Faker.datatype.hexaDecimal();
  data_json = () => Faker.datatype.json();
  data_array = () => Faker.datatype.array();

  //^ >>> HELPERS <<<
  helpers_randomize = () => Faker.helpers.randomize();
  helpers_slugify = () => Faker.helpers.slugify();
  helpers_replaceSymbolWithNumber = () => Faker.helpers.replaceSymbolWithNumber();
  helpers_replaceSymbols = () => Faker.helpers.replaceSymbols();
  helpers_replaceCreditCardSymbols = () => Faker.helpers.replaceCreditCardSymbols();
  helpers_repeatString = (str: string, repeatTimes: number) => Faker.helpers.repeatString(str, repeatTimes);
  helpers_regexpStyleStringParse = (str: string) => Faker.helpers.regexpStyleStringParse(str);
  helpers_shuffle = () => Faker.helpers.shuffle();
  helpers_mustache = (str, data) => Faker.helpers.mustache(str, data);
  helpers_createCard = () => Faker.helpers.createCard();
  helpers_contextualCard = () => Faker.helpers.contextualCard();
  helpers_userCard = () => Faker.helpers.userCard();
  helpers_createTransaction = () => Faker.helpers.createTransaction();

  //^ >>> LOREM <<<
  lorem_word = () => Faker.lorem.word();
  lorem_words = () => Faker.lorem.words();
  lorem_sentence = () => Faker.lorem.sentence();
  lorem_slug = () => Faker.lorem.slug();
  lorem_sentences = () => Faker.lorem.sentences();
  lorem_paragraph = () => Faker.lorem.paragraph();
  lorem_paragraphs = () => Faker.lorem.paragraphs();
  lorem_text = () => Faker.lorem.text();
  lorem_lines = () => Faker.lorem.lines();

  //^ >>> SYSTEM <<<
  system_fileName = () => Faker.system.fileName();
  system_commonFileName = () => Faker.system.commonFileName();
  system_mimeType = () => Faker.system.mimeType();
  system_commonFileType = () => Faker.system.commonFileType();
  system_commonFileExt = () => Faker.system.commonFileExt();
  system_fileType = () => Faker.system.fileType();
  system_fileExt = () => Faker.system.fileExt();
  system_directoryPath = () => Faker.system.directoryPath();
  system_filePath = () => Faker.system.filePath();
  system_semver = () => Faker.system.semver();

  //^ >>> BOT <<<
  bot_number = (max) => Faker.datatype.number(max);
  bot_music_title = (max) => Faker.lorem.words(this.bot_number(max));
  bot_numbers = (arr: number[], size: number): string => Faker.random.arrayElements(arr, size).join(' -> ');

  toText = (obj) => Object.entries(obj).reduce((acc, [k, v]) => `${acc}\n${k.toUpperCase()}: ${v}`, '');
  image = () => Faker.image.imageUrl();
  card = () => Faker.helpers.contextualCard();
}

export const Fake = new FakerHelper();
