import camelcase from 'camelcase';
import { FormatFunction } from '../typings';

const formatters: Record<string, FormatFunction> = {
  camelcase: (str: string): string => camelcase(str.toLowerCase()),
  pascalcase: (str: string): string =>
    camelcase(str.toLowerCase(), { pascalCase: true }),
  lowercase: (str: string): string => str.toLowerCase(),
  uppercase: (str: string): string => str.toUpperCase(),
};

const formatKey = (
  key: string,
  format: boolean | string | FormatFunction,
): string => {
  if (typeof format === 'string') {
    return formatters[format](key);
  }

  if (typeof format === 'function') {
    return format(key);
  }

  return key;
};

export { formatKey };
