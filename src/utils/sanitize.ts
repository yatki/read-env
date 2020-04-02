import { SanitizeOptions } from '../typings';

const isObject = (value: string): boolean =>
  value[0] === '{' && value[value.length - 1] === '}';

const isArray = (value: string): boolean =>
  value[0] === '[' && value[value.length - 1] === ']';

const isInt = (value: string): boolean => /^-?\d+$/.test(value);

const isFloat = (value: string): boolean => /^-?\d*(\.\d+)$/.test(value);
const isBool = (value: string): boolean => {
  const boolValue = value.toLowerCase();
  return boolValue === 'true' || boolValue === 'false';
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sanitize = (value: string, options: SanitizeOptions): any => {
  // Sanitize Object
  if (options.object && isObject(value)) {
    try {
      return JSON.parse(value);
    } catch (err) {
      return value;
    }
  }

  // Sanitize Array
  if (options.array && isArray(value)) {
    try {
      return JSON.parse(value);
    } catch (err) {
      return value;
    }
  }

  // Sanitize Integer
  if (options.int && isInt(value)) {
    return parseInt(value, 10);
  }

  // Sanitize Float
  if (options.float && isFloat(value)) {
    return parseFloat(value);
  }

  // Sanitize Boolean
  if (options.bool && isBool(value)) {
    return value.toLowerCase() === 'true';
  }

  // Return raw value
  return value;
};

export { sanitize };
