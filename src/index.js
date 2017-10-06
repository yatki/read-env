import camelcase from 'camelcase';
import merge from 'lodash/merge';

export default (options, transformer = 'camelcase') => {
  const variables = {};
  const defaultOptions = {
    prefix: null,
    includePrefix: false,
    transformer: 'camelcase',
    parse: {
      object: true,
      array: true,
      bool: true,
      int: true,
      float: true,
    },
  };

  if (typeof options === 'string') {
    options = {
      prefix: options,
      transformer,
    };
  }

  options = merge(defaultOptions, options);

  let keys = Object.keys(process.env);

  if (options.prefix) {
    keys = keys.filter(key => key.indexOf(options.prefix) === 0);
  }

  keys.forEach((key) => {
    let optionValue = process.env[key];
    let optionKey = key;

    if (!options.includePrefix) {
      optionKey = optionKey.replace(`${options.prefix}`, '');
    }

    if (transformer === 'camelcase') {
      optionKey = camelcase(optionKey);
    } else if (transformer === 'lowercase' || transformer === 'uppercase') {
      optionKey = transformer === 'lowercase' ? optionKey.toLowerCase() : optionKey.toUpperCase();
      optionKey = optionKey.indexOf('_') === 0 ? optionKey.slice(1) : optionKey;
    } else if (typeof transformer === 'function') {
      optionKey = transformer(optionKey);
    }

    if (options.parse) {
      if (options.parse.object && optionValue.indexOf('{') === 0) {
        optionValue = JSON.parse(optionValue);
      } else if (options.parse.array && optionValue.indexOf('[') === 0) {
        optionValue = JSON.parse(optionValue);
      } else if (options.parse.int && /^\d+$/.test(optionValue)) {
        optionValue = parseInt(optionValue, 10);
      } else if (options.parse.float && /^-?\d*(\.\d+)$/.test(optionValue)) {
        optionValue = parseFloat(optionValue);
      } else if (options.parse.bool && (optionValue.toLowerCase() === 'true' || optionValue.toLowerCase() === 'false')) {
        optionValue = optionValue.toLowerCase() === 'true';
      }
    }

    variables[optionKey] = optionValue;
  });
  return variables;
};
