import { ReadEnvOptions, ReadEnvResult } from './typings';
import { getOptions, sanitize, formatKey, trimLeft } from './utils';

const readEnv = (
  prefix?: string,
  options: Partial<ReadEnvOptions> = {},
): ReadEnvResult => {
  // Options
  const {
    format,
    source = process.env,
    includePrefix,
    sanitize: sanitizeOptions,
    separator,
  } = getOptions(options);

  let keys = Object.keys(source);

  // Filter keys by prefix
  if (typeof prefix === 'string' && prefix) {
    keys = keys.filter((value) => value.indexOf(prefix) === 0);
  }

  // Process keys
  return keys.reduce((result, key) => {
    let envValue = source[key]?.trim();
    let envKey = key;

    // Sanitize
    if (typeof sanitizeOptions === 'object' && envValue) {
      envValue = sanitize(envValue, sanitizeOptions);
    }

    // Remove Prefix
    if (!includePrefix && typeof prefix === 'string' && prefix) {
      envKey = envKey.replace(prefix, '');
    }

    // Trim left underscore
    envKey = trimLeft(envKey, '_');

    let deepKeys = [envKey];
    // Process deep object
    if (typeof separator === 'string' && separator) {
      deepKeys = envKey.split(separator);
    }

    deepKeys.reduce((acc, item, index) => {
      const deepKey = formatKey(item, format);
      if (index === deepKeys.length - 1) {
        acc[deepKey] = envValue;
      } else if (
        typeof acc[deepKey] !== 'object' ||
        Array.isArray(acc[deepKey])
      ) {
        acc[deepKey] = {};
      }
      return acc[deepKey];
    }, result);

    // and DONE!
    return result;
  }, {} as ReadEnvResult);
};

export { readEnv };
