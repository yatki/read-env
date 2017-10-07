import camelcase from 'camelcase';
import merge from 'lodash/merge';

export default (options, transformKey = 'camelcase') => {
  const variables = {};
  const defaultOptions = {
    prefix: null,
    removePrefix: true,
    transformKey: 'camelcase',
    parse: {
      object: true,
      array: true,
      bool: true,
      int: true,
      float: true,
    },
    filter: null,
  };

  if (typeof options === 'string') {
    options = {
      prefix: options,
      transformKey,
    };
  }

  options = merge(defaultOptions, options);

  let keys = Object.keys(process.env);

  if (options.filter) {
    keys = keys.filter(options.filter);
  } else if (options.prefix) {
    keys = keys.filter(key => key.indexOf(options.prefix) === 0);
  }

  keys.forEach((key) => {
    let optionValue = process.env[key];
    let optionKey = key;

    if (options.removePrefix) {
      optionKey = optionKey.replace(`${options.prefix}_`, '');
    }

    if (options.transformKey === 'camelcase') {
      optionKey = camelcase(optionKey);
    } else if (options.transformKey === 'lowercase' || options.transformKey === 'uppercase') {
      optionKey = options.transformKey === 'lowercase' ? optionKey.toLowerCase() : optionKey.toUpperCase();
    } else if (typeof options.transformKey === 'function') {
      optionKey = options.transformKey(optionKey);
    }

    if (options.parse) {
      if (options.parse.object && optionValue.indexOf('{') === 0) {
        try {
          optionValue = JSON.parse(optionValue);
        } catch (e) {
          throw Error(`Environment Variable "${key}" has invalid JSON input.`);
        }
      } else if (options.parse.array && optionValue.indexOf('[') === 0) {
        try {
          optionValue = JSON.parse(optionValue);
        } catch (e) {
          throw Error(`Environment Variable "${key}" has invalid JSON input.`);
        }
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
