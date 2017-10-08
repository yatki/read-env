'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _camelcase = require('camelcase');

var _camelcase2 = _interopRequireDefault(_camelcase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (options) {
  var transformKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'camelcase';

  var variables = {};
  var defaultOptions = {
    prefix: null,
    includePrefix: false,
    transformKey: 'camelcase',
    parse: {
      object: true,
      array: true,
      bool: true,
      int: true,
      float: true
    },
    ignoreInvalidJSON: true,
    filter: null
  };

  if (typeof options === 'string') {
    options = {
      prefix: options,
      transformKey: transformKey
    };
  }
  if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object' && _typeof(options.parse) === 'object') {
    options.parse = Object.assign({}, defaultOptions.parse, options.parse);
  }
  options = Object.assign({}, defaultOptions, options);

  var keys = Object.keys(process.env);

  if (options.filter) {
    keys = keys.filter(options.filter);
  } else if (options.prefix) {
    keys = keys.filter(function (key) {
      return key.indexOf(options.prefix) === 0;
    });
  }

  keys.forEach(function (key) {
    var optionValue = process.env[key];
    var optionKey = key;

    if (!options.includePrefix) {
      optionKey = optionKey.replace('' + options.prefix, '');
      optionKey = optionKey.indexOf('_') === 0 ? optionKey.slice(1) : optionKey;
    }

    if (options.transformKey === 'camelcase') {
      optionKey = (0, _camelcase2.default)(optionKey);
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
            throw Error('Environment Variable "' + key + '" has invalid JSON input.');
          }
        }
      } else if (options.parse.array && optionValue.indexOf('[') === 0) {
        try {
          optionValue = JSON.parse(optionValue);
        } catch (e) {
          if (!options.ignoreInvalidJSON) {
            throw Error('Environment Variable "' + key + '" has invalid JSON input.');
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