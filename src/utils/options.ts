import { ReadEnvOptions, SanitizeOptions } from '../typings';

const defaultOptions: ReadEnvOptions = {
  format: 'camelcase',
  separator: '__',
  sanitize: {
    object: true,
    array: true,
    bool: true,
    int: true,
    float: true,
  },
  includePrefix: false,
};

const getOptions = (userOptions: Partial<ReadEnvOptions>): ReadEnvOptions => {
  if (typeof userOptions.sanitize === 'object') {
    // eslint-disable-next-line no-param-reassign
    userOptions.sanitize = {
      ...(defaultOptions.sanitize as SanitizeOptions),
      ...userOptions.sanitize,
    };
  }
  return { ...defaultOptions, ...userOptions };
};

export { defaultOptions, getOptions };
