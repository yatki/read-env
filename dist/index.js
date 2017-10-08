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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJvcHRpb25zIiwidHJhbnNmb3JtS2V5IiwidmFyaWFibGVzIiwiZGVmYXVsdE9wdGlvbnMiLCJwcmVmaXgiLCJpbmNsdWRlUHJlZml4IiwicGFyc2UiLCJvYmplY3QiLCJhcnJheSIsImJvb2wiLCJpbnQiLCJmbG9hdCIsImlnbm9yZUludmFsaWRKU09OIiwiZmlsdGVyIiwiT2JqZWN0IiwiYXNzaWduIiwia2V5cyIsInByb2Nlc3MiLCJlbnYiLCJrZXkiLCJpbmRleE9mIiwiZm9yRWFjaCIsIm9wdGlvblZhbHVlIiwib3B0aW9uS2V5IiwicmVwbGFjZSIsInNsaWNlIiwidG9Mb3dlckNhc2UiLCJ0b1VwcGVyQ2FzZSIsIkpTT04iLCJlIiwiRXJyb3IiLCJ0ZXN0IiwicGFyc2VJbnQiLCJwYXJzZUZsb2F0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7a0JBRWUsVUFBQ0EsT0FBRCxFQUF5QztBQUFBLE1BQS9CQyxZQUErQix1RUFBaEIsV0FBZ0I7O0FBQ3RELE1BQU1DLFlBQVksRUFBbEI7QUFDQSxNQUFNQyxpQkFBaUI7QUFDckJDLFlBQVEsSUFEYTtBQUVyQkMsbUJBQWUsS0FGTTtBQUdyQkosa0JBQWMsV0FITztBQUlyQkssV0FBTztBQUNMQyxjQUFRLElBREg7QUFFTEMsYUFBTyxJQUZGO0FBR0xDLFlBQU0sSUFIRDtBQUlMQyxXQUFLLElBSkE7QUFLTEMsYUFBTztBQUxGLEtBSmM7QUFXckJDLHVCQUFtQixJQVhFO0FBWXJCQyxZQUFRO0FBWmEsR0FBdkI7O0FBZUEsTUFBSSxPQUFPYixPQUFQLEtBQW1CLFFBQXZCLEVBQWlDO0FBQy9CQSxjQUFVO0FBQ1JJLGNBQVFKLE9BREE7QUFFUkM7QUFGUSxLQUFWO0FBSUQ7QUFDRCxNQUFJLFFBQU9ELE9BQVAseUNBQU9BLE9BQVAsT0FBbUIsUUFBbkIsSUFBK0IsUUFBT0EsUUFBUU0sS0FBZixNQUF5QixRQUE1RCxFQUFzRTtBQUNwRU4sWUFB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QUFzQlQsV0FBdEIsQ0FBM0IsRUFBK0Q7QUFDcEVBLHNCQUFjVyxXQUFXWCxXQUFYLENBQWQ7QUFDRCxPQUZNLE1BRUEsSUFBSXRCLFFBQVFNLEtBQVIsQ0FBY0csSUFBZCxLQUF1QmEsWUFBWUksV0FBWixPQUE4QixNQUE5QixJQUF3Q0osWUFBWUksV0FBWixPQUE4QixPQUE3RixDQUFKLEVBQTJHO0FBQ2hISixzQkFBY0EsWUFBWUksV0FBWixPQUE4QixNQUE1QztBQUNEO0FBQ0Y7O0FBRUR4QixjQUFVcUIsU0FBVixJQUF1QkQsV0FBdkI7QUFDRCxHQTVDRDtBQTZDQSxTQUFPcEIsU0FBUDtBQUNELEMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2FtZWxjYXNlIGZyb20gJ2NhbWVsY2FzZSc7XG5cbmV4cG9ydCBkZWZhdWx0IChvcHRpb25zLCB0cmFuc2Zvcm1LZXkgPSAnY2FtZWxjYXNlJykgPT4ge1xuICBjb25zdCB2YXJpYWJsZXMgPSB7fTtcbiAgY29uc3QgZGVmYXVsdE9wdGlvbnMgPSB7XG4gICAgcHJlZml4OiBudWxsLFxuICAgIGluY2x1ZGVQcmVmaXg6IGZhbHNlLFxuICAgIHRyYW5zZm9ybUtleTogJ2NhbWVsY2FzZScsXG4gICAgcGFyc2U6IHtcbiAgICAgIG9iamVjdDogdHJ1ZSxcbiAgICAgIGFycmF5OiB0cnVlLFxuICAgICAgYm9vbDogdHJ1ZSxcbiAgICAgIGludDogdHJ1ZSxcbiAgICAgIGZsb2F0OiB0cnVlLFxuICAgIH0sXG4gICAgaWdub3JlSW52YWxpZEpTT046IHRydWUsXG4gICAgZmlsdGVyOiBudWxsLFxuICB9O1xuXG4gIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ3N0cmluZycpIHtcbiAgICBvcHRpb25zID0ge1xuICAgICAgcHJlZml4OiBvcHRpb25zLFxuICAgICAgdHJhbnNmb3JtS2V5LFxuICAgIH07XG4gIH1cbiAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnb2JqZWN0JyAmJiB0eXBlb2Ygb3B0aW9ucy5wYXJzZSA9PT0gJ29iamVjdCcpIHtcbiAgICBvcHRpb25zLnBhcnNlID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdE9wdGlvbnMucGFyc2UsIG9wdGlvbnMucGFyc2UpO1xuICB9XG4gIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0T3B0aW9ucywgb3B0aW9ucyk7XG5cbiAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyhwcm9jZXNzLmVudik7XG5cbiAgaWYgKG9wdGlvbnMuZmlsdGVyKSB7XG4gICAga2V5cyA9IGtleXMuZmlsdGVyKG9wdGlvbnMuZmlsdGVyKTtcbiAgfSBlbHNlIGlmIChvcHRpb25zLnByZWZpeCkge1xuICAgIGtleXMgPSBrZXlzLmZpbHRlcihrZXkgPT4ga2V5LmluZGV4T2Yob3B0aW9ucy5wcmVmaXgpID09PSAwKTtcbiAgfVxuXG4gIGtleXMuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgbGV0IG9wdGlvblZhbHVlID0gcHJvY2Vzcy5lbnZba2V5XTtcbiAgICBsZXQgb3B0aW9uS2V5ID0ga2V5O1xuXG4gICAgaWYgKCFvcHRpb25zLmluY2x1ZGVQcmVmaXgpIHtcbiAgICAgIG9wdGlvbktleSA9IG9wdGlvbktleS5yZXBsYWNlKGAke29wdGlvbnMucHJlZml4fWAsICcnKTtcbiAgICAgIG9wdGlvbktleSA9IG9wdGlvbktleS5pbmRleE9mKCdfJykgPT09IDAgPyBvcHRpb25LZXkuc2xpY2UoMSkgOiBvcHRpb25LZXk7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMudHJhbnNmb3JtS2V5ID09PSAnY2FtZWxjYXNlJykge1xuICAgICAgb3B0aW9uS2V5ID0gY2FtZWxjYXNlKG9wdGlvbktleSk7XG4gICAgfSBlbHNlIGlmIChvcHRpb25zLnRyYW5zZm9ybUtleSA9PT0gJ2xvd2VyY2FzZScgfHwgb3B0aW9ucy50cmFuc2Zvcm1LZXkgPT09ICd1cHBlcmNhc2UnKSB7XG4gICAgICBvcHRpb25LZXkgPSBvcHRpb25zLnRyYW5zZm9ybUtleSA9PT0gJ2xvd2VyY2FzZScgPyBvcHRpb25LZXkudG9Mb3dlckNhc2UoKSA6IG9wdGlvbktleS50b1VwcGVyQ2FzZSgpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIG9wdGlvbnMudHJhbnNmb3JtS2V5ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBvcHRpb25LZXkgPSBvcHRpb25zLnRyYW5zZm9ybUtleShvcHRpb25LZXkpO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLnBhcnNlKSB7XG4gICAgICBpZiAob3B0aW9ucy5wYXJzZS5vYmplY3QgJiYgb3B0aW9uVmFsdWUuaW5kZXhPZigneycpID09PSAwKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgb3B0aW9uVmFsdWUgPSBKU09OLnBhcnNlKG9wdGlvblZhbHVlKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGlmICghb3B0aW9ucy5pZ25vcmVJbnZhbGlkSlNPTikge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoYEVudmlyb25tZW50IFZhcmlhYmxlIFwiJHtrZXl9XCIgaGFzIGludmFsaWQgSlNPTiBpbnB1dC5gKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAob3B0aW9ucy5wYXJzZS5hcnJheSAmJiBvcHRpb25WYWx1ZS5pbmRleE9mKCdbJykgPT09IDApIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBvcHRpb25WYWx1ZSA9IEpTT04ucGFyc2Uob3B0aW9uVmFsdWUpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgaWYgKCFvcHRpb25zLmlnbm9yZUludmFsaWRKU09OKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihgRW52aXJvbm1lbnQgVmFyaWFibGUgXCIke2tleX1cIiBoYXMgaW52YWxpZCBKU09OIGlucHV0LmApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChvcHRpb25zLnBhcnNlLmludCAmJiAvXlxcZCskLy50ZXN0KG9wdGlvblZhbHVlKSkge1xuICAgICAgICBvcHRpb25WYWx1ZSA9IHBhcnNlSW50KG9wdGlvblZhbHVlLCAxMCk7XG4gICAgICB9IGVsc2UgaWYgKG9wdGlvbnMucGFyc2UuZmxvYXQgJiYgL14tP1xcZCooXFwuXFxkKykkLy50ZXN0KG9wdGlvblZhbHVlKSkge1xuICAgICAgICBvcHRpb25WYWx1ZSA9IHBhcnNlRmxvYXQob3B0aW9uVmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChvcHRpb25zLnBhcnNlLmJvb2wgJiYgKG9wdGlvblZhbHVlLnRvTG93ZXJDYXNlKCkgPT09ICd0cnVlJyB8fCBvcHRpb25WYWx1ZS50b0xvd2VyQ2FzZSgpID09PSAnZmFsc2UnKSkge1xuICAgICAgICBvcHRpb25WYWx1ZSA9IG9wdGlvblZhbHVlLnRvTG93ZXJDYXNlKCkgPT09ICd0cnVlJztcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXJpYWJsZXNbb3B0aW9uS2V5XSA9IG9wdGlvblZhbHVlO1xuICB9KTtcbiAgcmV0dXJuIHZhcmlhYmxlcztcbn07XG4iXX0=