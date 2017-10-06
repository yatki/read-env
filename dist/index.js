'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _camelcase = require('camelcase');

var _camelcase2 = _interopRequireDefault(_camelcase);

var _merge = require('lodash/merge');

var _merge2 = _interopRequireDefault(_merge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (options) {
  var transformer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'camelcase';

  var variables = {};
  var defaultOptions = {
    prefix: null,
    includePrefix: false,
    transformer: 'camelcase',
    parse: {
      object: true,
      bool: true,
      int: true,
      float: true
    }
  };

  if (typeof options === 'string') {
    options = {
      prefix: options,
      transformer: transformer
    };
  }

  options = (0, _merge2.default)(defaultOptions, options);

  var keys = Object.keys(process.env);

  if (options.prefix) {
    keys = keys.filter(function (key) {
      return key.indexOf(options.prefix) === 0;
    });
  }

  keys.forEach(function (key) {
    var optionValue = process.env[key];
    var optionKey = key;

    if (options.includePrefix) {
      optionKey = optionKey.replace('' + options.prefix, '');
    }

    if (transformer === 'camelcase') {
      optionKey = (0, _camelcase2.default)(optionKey);
    } else if (transformer === 'lowercase' || transformer === 'uppercase') {
      optionKey = transformer === 'lowercase' ? optionKey.toLowerCase() : optionKey.toUpperCase();
      optionKey = optionKey.indexOf('_') === 0 ? optionKey.slice(1) : optionKey;
    } else if (typeof transformer === 'function') {
      optionKey = transformer(optionKey);
    }

    if (options.parse) {
      if (options.parse.object && optionValue.indexOf('{') === 0) {
        optionValue = JSON.parse(optionValue);
      } else if (options.parse.int && /^\d+$/.test(optionValue)) {
        optionValue = parseInt(optionValue, 10);
      } else if (options.parse.float && /^-?\d*(\.\d+)?$/.test(optionValue)) {
        optionValue = parseFloat(optionValue);
      } else if (options.parse.bool && (optionValue.toLowerCase() === 'true' || optionValue.toLowerCase() === 'false')) {
        optionValue = optionValue.toLowerCase() === 'true';
      }
    }

    variables[optionKey] = optionValue;
  });
  return variables;
};