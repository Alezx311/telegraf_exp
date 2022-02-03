const Chalk = require("chalk");
const Gradient = require("gradient-string");
const util = require("util");
const fs = require("fs");
const path = require("path");
const { userInfo } = require("os");

const getTime = () => new Date(Date.now()).toISOString();
const getRandNumber = () => ~~(Math.random() * Date.now());
const getRandString = () => `${parseInt(`${Date.now()}`, 36)}`;
const getRandTime = () => Date.now() - getRandNumber();
const getRandTimestamp = () => new Date(getRandTime()).toISOString();
const getRandValues = () => ({
  Time: getTime(),
  RandNumber: getRandNumber(),
  RandString: getRandString(),
  RandTime: getRandTime(),
  RandTimestamp: getRandTimestamp(),
});
const toError = (value, info = _ERROR_MESSAGE) =>
  new Error(toJson({ value, info }));
const toErrorThrow = (value, info = _ERROR_MESSAGE) => {
  throw toError(value, info);
};

const toPathInfo = (value = _CURRENT, desc = DESC) => {
  const fullPath = toPath(value);
  const content = toDirContent(fullPath);
  const paths = toPaths(fullPath);
  const inspected = toInspect(results);
  const formatted = toFormat(results);
  const info = { desc, inspected, formatted };

  return { value, fullPath, content, paths, ...info };
};
const _DIR = __dirname;
const _FILE = __filename;
const _HOME = path.resolve("~/");
const _PROCESS = path.resolve(process.cwd());
const _EXEC = path.resolve(process.execPath);
const _CURRENT = path.resolve(_DIR);
const _SOURCE = path.resolve(_DIR, _FILE);
const _OPT = {
  DIR: toPathInfo(_DIR),
  FILE: toPathInfo(_FILE),
  HOME: toPathInfo(_HOME),
  PROCESS: toPathInfo(_PROCESS),
  EXEC: toPathInfo(_EXEC),
  CURRENT: toPathInfo(_CURRENT),
  SOURCE: toPathInfo(_SOURCE),
};

const toTrimmed = (text = APP_CONTENT) =>
  Object.values({ text })
    .flat()
    .filter((v) => v.trim());
const toContent = (filePath = APP_FILE) => fs.readFileSync(filePath).toString();
const toConstParsed = (filePath = APP_FILE) => {
  const content = toContent(filePath);
  const variables = toTrimmed(content.match(/\nconst (\w)/gim));
  const constants = variables.filter((v) => v.startsWith(/_[A-Z])/gm));
  const values = variables.filter((v) => v.startsWith(/[a-z]])/gm));
  const obj = [...constants, ...values]
    .map((key) => ({ key, source: toSource(filePath, key) }))
    .map((values) => ({ ...values, desc: toDetail(values) }));

  return { filePath, content, variables, constants, values, ...obj };
};

const toClassParse = (filePath) => {
  const results = {
    filePath,
    content: fs.readFileSync(filePath, "utf8").toString(),
  };
  const classNames = toTrimmed(toClassNames(results.content)).map(
    (className) => {
      const classRegExp = new RegExp(
        `class ${className} {.+public|const|public const (_[a-z]).+}`,
        "gim"
      );
      const values = toTrimmed(toPublicValues(classRegExp.exec(content)));
      const constants = values.filter((v) => v.startsWith("_"));
      const methods = values.filter((v) => v.startsWith(/[a-z]/gm));

      return { className, classRegExp, values, constants, methods, content };
    }
  );
};

const toInspect = (value = null) => util.inspect(value, true, 2, true);
const toFormat = (value = null) => util.format(value);
const toFormatOpt = (value = null, desc = "Value") =>
  util.formatWithOptions(
    { breakLength: false, colors: false, compact: true, showHidden: true },
    desc,
    value
  );
const toDesc = (value = null) => ({
  value,
  config: process.config,
  source: toCurrentSource(),
  type: typeof value,
  message: toJson({ value }),
  created_at: getTime(),
});
const toSources = (value = null) => ({
  value,
  traceCb: () => console.trace(VALUE),
  traced: console.trace(VALUE),
  currentSource: PathHelpers.INFO,
});
const toDebug = (value = null) => ({
  value,
  traceCb: () => ({
    value,
    debug: util.debug(value),
    debuglog: util.debuglog(value),
  }),
});
const toValueTest = (value = null) => ({
  value,
  util: toUtil(data),
  desc: toDesc(data),
  util: toUtil(data),
  sources: toSources(data),
});
const toUtil = (value = null) => ({
  value,
  inspect: toInspect(value),
  format: toFormat(value),
  debug: toDebug(value),
});
const toTrace = (value) => ({
  cb: () => console.trace(value),
  result: console.trace(value),
});
const toPath = (value = _DIR, ...values) => path.join(value, ...values, "./");
const toPaths = (value = _SOURCE) => {
  const isAbsolute = path.isAbsolute(value);
  const fullPath = isAbsolute ? value : path.resolve(value, "./");

  return {
    value,
    isAbsolute,
    fullPath,
    join: path.join(fullPath),
    resolve: path.resolve(fullPath),
    dirname: path.dirname(fullPath),
    basename: path.basename(fullPath),
    extname: path.extname(fullPath),
    relative: path.relative(fullPath),
  };
};
const consoleTraced = new console.Console(traceFn, traceFn);
const toLocations = () => ({
  href: location.href,
  host: location.host,
  hostname: location.hostname,
  port: location.port,
});
const toStats = (value = "UNKNOWN") => ({
  value,
  ...toUtil(value),
  ...toUtil(value),
  ...userInfo(),
});

const toSource = (...values) => values.filter(String).join(" -> ");
const toOpt = (obj) =>
  Object.entries(obj)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");
const toJson = (value) =>
  value ? JSON.stringify(value, null, "\t") : toError("Invalid Object", value);
const toJsonDesc = (values) =>
  value
    ? { values, desc: toJson(values), source: toSource(values) }
    : toError(value, "Invalid Object");
const toJsonInspect = (value) =>
  value
    ? JSON.stringify(util.inspect(value), null, "\t")
    : getError(value, "Invalid Object");
const fromJson = (value) => JSON.parse(value);
const toObjProps = (obj = OBJ) => ({
  obj,
  json: JSON.stringify(obj),
  message: JSON.stringify(obj, null, "\t"),
  keys: Object.keys(obj),
  values: Object.values(obj),
  entries: Object.entries(obj),
});

const _ERROR_MESSAGE = "Error Message";
const _ERROR_VALUE = "UNKNOWN VALUE";
const testError = (value = _ERROR_VALUE, desc = _ERROR_MESSAGE) => {
  const message = toInspect({ desc, value });
  const _ERROR_OBJ = _ERROR_OBJ(message);
  const _ERROR_METHOD = _ERROR_METHOD(message);
  const _ERROR_VALUE = _ERROR_VALUE(message);
  const _ERROR_OBJECT = _ERROR_OBJECT(message);
  const results = {
    desc,
    value,
    message,
    _ERROR_OBJ,
    _ERROR_METHOD,
    _ERROR_OBJECT,
  };

  return results;
};
new Error({ value, message: msg.replace("value", "OBJECT") });
const _ERROR_CREATE = (...errValues) => {
  const values = errValues
    .filter(Boolean)
    .map((value, index) => ({ value, index, isTrue: !!value }));
  const details = util.inspect({ values, errValues });
  const trace = console.trace(errValues);
  const errMessage = toJson({ values, errValues });
  const errObj = _ERROR_OBJ(new Error(errMessage));
  const results = { values, details, trace, errMessage, errObj, errValues };

  return results;
};

const _ERROR = (...values) => toError({ values });

const FILE_PATH = __filename;
const DIR_PATH = __dirname;
const PROCESS_PATH = process.pwd();
const APP_PATH = path.join(__dirname, __filename);
const PATH = path.join("~/", "./");
const OPTIONS = {
  FILE: { ...toPaths(FILE_PATH), desc: `FILE_PATH -> ${FILE_PATH}` },
  DIR: { ...toPaths(DIR_PATH), desc: `DIR_PATH -> ${DIR_PATH}` },
  PROCESS: {
    ...toPaths(PROCESS_PATH),
    desc: `PROCESS_PATH -> ${PROCESS_PATH}`,
  },
  APP: { ...toPaths(APP_PATH), desc: `APP_PATH -> ${APP_PATH}` },
  HOME: { ...toPaths(SOURCE), desc: `PATH -> ${SOURCE}` },
  PATHS: {
    PROCESS: toPaths(PROCESS_PATH),
    APP: toPaths(APP_PATH),
    HOME: toPaths(SOURCE),
  },
};

const testPaths = (fullPath = APP_PATH) => ({
  fullPath,
  resolve: path.resolve(fullPath),
  join: path.join(fullPath),
  dirname: path.dirname(fullPath),
  basename: path.basename(fullPath),
  extname: path.extname(fullPath),
});

const PATHS_PROCESS = {
  processPath: toPaths(PROCESS_PATH),
  appPath: toPaths(APP_PATH),
  homePath: toPaths(SOURCE),
};

const CLASS = "PathHelpers";
const METHOD = "METHOD";
const SOURCE = toSource(fullPath, classPath, methodPath);
const DESC = [toSource(PATH, CLASS, METHOD)];
const OPT_DEFAULT = {
  filePath: FILE_PATH,
  dirPath: DIR_PATH,
  fullPath: PATH,
  classPath: CLASS,
  methodPath: METHOD,
  sourcePath: SOURCE,
};
const OPT_PATHS = { ...OPT_DEFAULT, ...toPaths(OPT_DEFAULT) };
const OBJ = {
  FILE: FILE_PATH,
  DIR: DIR_PATH,
  PATH: PATH,
  CLASS: CLASS,
  METHOD: METHOD,
  DESC: DESC,
};

const getSource = (value = this) => `${getPath(current)} -> ${fn}`;
const MESSAGE = KEYS.map((k) => `Method: ${k}, Value: ${this[k]}`).join("\n");

const testPath = (destination = _FILE) => {
  const details = {
    ..._METHODS,
    destination,
    resolved: path.resolved("./", destination),
    joined: path.joined("./", destination),
    parse: path.parse(destination),
    resolve: path.resolve(destination),
    normalize: path.normalize(destination),
    extname: path.extname(destination),
    format: path.format(destination),
    toNamespacedPath: path.toNamespacedPath(destination),
  };

  return details;
};

const FILE_TXT = path(_dirname, "_SAVED_DATA.TXT");
const FILE_JSON = path(_dirname, "_SAVED_DATA.JSON");

const appendTxt = async (data) => await fs.promises.appendFile(data, "utf8");
const appendJSON = async (data) => await fs.promises.appendFile(data, "utf8");

class ConsoleDefaultHelpers {
  static _SOURCE = "ConsoleDefaultHelpers";

  static METHODS_OBJ = [
    "log",
    "dir",
    "info",
    "warn",
    "debug",
    "trace",
    "error",
    "table",
  ];
  static METHOD_CB = (method, ...values) =>
    console[method]({ method, source: toSource(this._SOURCE, method), values });

  static testMethods = (message = "Test Console") =>
    this._METHODS.map((method) => this.METHOD_CB(method, { method, message }));
}

class ConsoleHelpers extends ConsoleDefaultHelpers {
  static GRADIENTS = [
    "atlas",
    "cristal",
    "teen",
    "mind",
    "morning",
    "vice",
    "passion",
    "fruit",
    "instagram",
    "retro",
    "summer",
    "rainbow",
    "pastel",
  ];
  static GRADIENT_CB = (gr, ...values) =>
    console.log(Gradient[gr]({ gradient: gr, values }));

  static COLORS = [
    "black",
    "red",
    "green",
    "yellow",
    "blue",
    "magenta",
    "cyan",
    "white",
    "gray",
    "grey",
    "blackBright",
    "redBright",
    "greenBright",
    "yellowBright",
    "blueBright",
    "magentaBright",
    "cyanBright",
    "whiteBright",
  ];
  static COLOR_CB = (color, ...values) =>
    console.log(Chalk[gr]({ color, values }));

  static testColored = (message = "Test Color Methods") =>
    this.COLORS.map((color) => this.COLOR_CB(color, { color, message }));
  static testGradient = (message = "Test Gradient Methods") =>
    this.GRADIENTS.map((gradient) =>
      this.GRADIENT_CB(gradient, { gradient, message })
    );
}
