(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.readEnv = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

  console.log('process.env', process.env);
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
},{"camelcase":2}],2:[function(require,module,exports){
'use strict';

const preserveCamelCase = input => {
	let isLastCharLower = false;
	let isLastCharUpper = false;
	let isLastLastCharUpper = false;

	for (let i = 0; i < input.length; i++) {
		const c = input[i];

		if (isLastCharLower && /[a-zA-Z]/.test(c) && c.toUpperCase() === c) {
			input = input.slice(0, i) + '-' + input.slice(i);
			isLastCharLower = false;
			isLastLastCharUpper = isLastCharUpper;
			isLastCharUpper = true;
			i++;
		} else if (isLastCharUpper && isLastLastCharUpper && /[a-zA-Z]/.test(c) && c.toLowerCase() === c) {
			input = input.slice(0, i - 1) + '-' + input.slice(i - 1);
			isLastLastCharUpper = isLastCharUpper;
			isLastCharUpper = false;
			isLastCharLower = true;
		} else {
			isLastCharLower = c.toLowerCase() === c;
			isLastLastCharUpper = isLastCharUpper;
			isLastCharUpper = c.toUpperCase() === c;
		}
	}

	return input;
};

module.exports = (input, options) => {
	options = Object.assign({
		pascalCase: false
	}, options);

	const postProcess = x => options.pascalCase ? x.charAt(0).toUpperCase() + x.slice(1) : x;

	if (Array.isArray(input)) {
		input = input.map(x => x.trim())
			.filter(x => x.length)
			.join('-');
	} else {
		input = input.trim();
	}

	if (input.length === 0) {
		return '';
	}

	if (input.length === 1) {
		return options.pascalCase ? input.toUpperCase() : input.toLowerCase();
	}

	if (/^[a-z\d]+$/.test(input)) {
		return postProcess(input);
	}

	const hasUpperCase = input !== input.toLowerCase();

	if (hasUpperCase) {
		input = preserveCamelCase(input);
	}

	input = input
		.replace(/^[_.\- ]+/, '')
		.toLowerCase()
		.replace(/[_.\- ]+(\w|$)/g, (m, p1) => p1.toUpperCase());

	return postProcess(input);
};

},{}]},{},[1])(1)
});
