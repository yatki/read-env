import camelcase from 'camelcase';

export default (options, transformKey = 'camelcase') => {
  const variables = {};
  const defaultOptions = {
    prefix: null,
    includePrefix: false,
    transformKey: 'camelcase',
    parse: {
      object: true,
      array: true,
      bool: true,
      int: true,
      float: true,
    },
    ignoreInvalidJSON: true,
    filter: null,
  };

  if (typeof options === 'string') {
    options = {
      prefix: options,
      transformKey,
    };
  }
  if (typeof options === 'object' && typeof options.parse === 'object') {
    options.parse = Object.assign({}, defaultOptions.parse, options.parse);
  }
  options = Object.assign({}, defaultOptions, options);

  let keys = Object.keys(process.env);

  if (options.filter) {
    keys = keys.filter(options.filter);
  } else if (options.prefix) {
    keys = keys.filter(key => key.indexOf(options.prefix) === 0);
  }

  keys.forEach((key) => {
    let optionValue = process.env[key];
    let optionKey = key;

    if (!options.includePrefix) {
      optionKey = optionKey.replace(`${options.prefix}`, '');
      optionKey = optionKey.indexOf('_') === 0 ? optionKey.slice(1) : optionKey;
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
          if (!options.ignoreInvalidJSON) {
            throw Error(`Environment Variable "${key}" has invalid JSON input.`);
          }
        }
      } else if (options.parse.array && optionValue.indexOf('[') === 0) {
        try {
          optionValue = JSON.parse(optionValue);
        } catch (e) {
          if (!options.ignoreInvalidJSON) {
            throw Error(`Environment Variable "${key}" has invalid JSON input.`);
          }
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
