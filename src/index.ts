/* eslint-disable no-param-reassign */
import camelcase from 'camelcase';
import { ReadEnvOptions, Format, SanitizeOptions } from './typings';

const formatters = {
  camelcase: (str: string): string => camelcase(str),
  pascalcase: (str: string) => camelcase(str, { pascalCase: true }),
  lowercase: (str: string): string => str.toLowerCase(),
  uppercase: (str: string): string => str.toUpperCase(),
};

const sanitizeJSON = (
  key: string,
  str: string,
  ignoreInvalidJSON: boolean,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any => {
  let json;
  try {
    json = JSON.parse(str);
  } catch (e) {
    if (!ignoreInvalidJSON) {
      throw Error(`Can not sanitize "${key}": invalid JSON input.`);
    }
  }
  return json;
};

const formatterNames: Format[] = [
  'none',
  'camelcase',
  'pascalcase',
  'lowercase',
  'uppercase',
];

const err = (message: string): never => {
  throw new Error(message);
};

const readEnv = (
  prefix: string,
  userOptions: Partial<ReadEnvOptions> = {},
): object => {
  const defaultOptions: ReadEnvOptions = {
    source: process.env,
    format: 'camelcase',
    deepObjectSeparator: '__',
    sanitize: {
      object: true,
      array: true,
      bool: true,
      int: true,
      float: true,
    },
    includePrefix: false,
    ignoreInvalidJSON: true,
  };

  if (typeof userOptions.sanitize === 'object') {
    userOptions.sanitize = {
      ...(defaultOptions.sanitize as SanitizeOptions),
      ...userOptions.sanitize,
    };
  }
  const options = { ...defaultOptions, ...userOptions };

  // Validate Options
  const {
    format,
    source,
    includePrefix,
    sanitize,
    ignoreInvalidJSON,
  } = options;

  if (typeof format === 'string' && !formatterNames.includes(format)) {
    err(`Invalid format: ${format}`);
  }

  // Process keys
  const variables: { [key: string]: any } = {};

  const matchingEnvVarKeys = Object.keys(source).filter(
    (value) => value.indexOf(prefix) === 0,
  );

  matchingEnvVarKeys.forEach((key) => {
    let envValue: any = source[key]?.trim();
    let envKey = key;

    if (!includePrefix) {
      envKey = envKey.replace(prefix, '');
      envKey = envKey.indexOf('_') === 0 ? envKey.slice(1) : envKey;
    }

    if (typeof format === 'string' && format !== 'none') {
      envKey = formatters[format](envKey);
    } else if (typeof format === 'function') {
      envKey = format(envKey);
    }

    if (typeof sanitize === 'object' && envValue) {
      if (sanitize.object && envValue.indexOf('{') === 0) {
        envValue = sanitizeJSON(key, envValue, ignoreInvalidJSON);
      } else if (sanitize.array && envValue.indexOf('[') === 0) {
        envValue = sanitizeJSON(key, envValue, ignoreInvalidJSON);
      } else if (sanitize.int && /^\d+$/.test(envValue)) {
        envValue = parseInt(envValue, 10);
      } else if (sanitize.float && /^-?\d*(\.\d+)$/.test(envValue)) {
        envValue = parseFloat(envValue);
      } else if (sanitize.bool) {
        const boolValue = envValue.toLowerCase();
        if (boolValue === 'true' || boolValue === 'false') {
          envValue = envValue.toLowerCase() === 'true';
        }
      }
    }

    variables[envKey] = envValue;
  });
  return variables;
};

export { readEnv };
