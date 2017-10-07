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
  var transformKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'camelcase';

  var variables = {};
  var defaultOptions = {
    prefix: null,
    removePrefix: true,
    transformKey: 'camelcase',
    parse: {
      object: true,
      array: true,
      bool: true,
      int: true,
      float: true
    },
    filter: null
  };

  if (typeof options === 'string') {
    options = {
      prefix: options,
      transformKey: transformKey
    };
  }

  options = (0, _merge2.default)(defaultOptions, options);

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

    if (options.removePrefix) {
      optionKey = optionKey.replace(options.prefix + '_', '');
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
          throw Error('Environment Variable "' + key + '" has invalid JSON input.');
        }
      } else if (options.parse.array && optionValue.indexOf('[') === 0) {
        try {
          optionValue = JSON.parse(optionValue);
        } catch (e) {
          throw Error('Environment Variable "' + key + '" has invalid JSON input.');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJvcHRpb25zIiwidHJhbnNmb3JtS2V5IiwidmFyaWFibGVzIiwiZGVmYXVsdE9wdGlvbnMiLCJwcmVmaXgiLCJyZW1vdmVQcmVmaXgiLCJwYXJzZSIsIm9iamVjdCIsImFycmF5IiwiYm9vbCIsImludCIsImZsb2F0IiwiZmlsdGVyIiwia2V5cyIsIk9iamVjdCIsInByb2Nlc3MiLCJlbnYiLCJrZXkiLCJpbmRleE9mIiwiZm9yRWFjaCIsIm9wdGlvblZhbHVlIiwib3B0aW9uS2V5IiwicmVwbGFjZSIsInRvTG93ZXJDYXNlIiwidG9VcHBlckNhc2UiLCJKU09OIiwiZSIsIkVycm9yIiwidGVzdCIsInBhcnNlSW50IiwicGFyc2VGbG9hdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7O2tCQUVlLFVBQUNBLE9BQUQsRUFBeUM7QUFBQSxNQUEvQkMsWUFBK0IsdUVBQWhCLFdBQWdCOztBQUN0RCxNQUFNQyxZQUFZLEVBQWxCO0FBQ0EsTUFBTUMsaUJBQWlCO0FBQ3JCQyxZQUFRLElBRGE7QUFFckJDLGtCQUFjLElBRk87QUFHckJKLGtCQUFjLFdBSE87QUFJckJLLFdBQU87QUFDTEMsY0FBUSxJQURIO0FBRUxDLGFBQU8sSUFGRjtBQUdMQyxZQUFNLElBSEQ7QUFJTEMsV0FBSyxJQUpBO0FBS0xDLGFBQU87QUFMRixLQUpjO0FBV3JCQyxZQUFRO0FBWGEsR0FBdkI7O0FBY0EsTUFBSSxPQUFPWixPQUFQLEtBQW1CLFFBQXZCLEVBQWlDO0FBQy9CQSxjQUFVO0FBQ1JJLGNBQVFKLE9BREE7QUFFUkM7QUFGUSxLQUFWO0FBSUQ7O0FBRURELFlBQVUscUJBQU1HLGNBQU4sRUFBc0JILE9BQXRCLENBQVY7O0FBRUEsTUFBSWEsT0FBT0MsT0FBT0QsSUFBUCxDQUFZRSxRQUFRQyxHQUFwQixDQUFYOztBQUVBLE1BQUloQixRQUFRWSxNQUFaLEVBQW9CO0FBQ2xCQyxXQUFPQSxLQUFLRCxNQUFMLENBQVlaLFFBQVFZLE1BQXBCLENBQVA7QUFDRCxHQUZELE1BRU8sSUFBSVosUUFBUUksTUFBWixFQUFvQjtBQUN6QlMsV0FBT0EsS0FBS0QsTUFBTCxDQUFZO0FBQUEsYUFBT0ssSUFBSUMsT0FBSixDQUFZbEIsUUFBUUksTUFBcEIsTUFBZ0MsQ0FBdkM7QUFBQSxLQUFaLENBQVA7QUFDRDs7QUFFRFMsT0FBS00sT0FBTCxDQUFhLFVBQUNGLEdBQUQsRUFBUztBQUNwQixRQUFJRyxjQUFjTCxRQUFRQyxHQUFSLENBQVlDLEdBQVosQ0FBbEI7QUFDQSxRQUFJSSxZQUFZSixHQUFoQjs7QUFFQSxRQUFJakIsUUFBUUssWUFBWixFQUEwQjtBQUN4QmdCLGtCQUFZQSxVQUFVQyxPQUFWLENBQXFCdEIsUUFBUUksTUFBN0IsUUFBd0MsRUFBeEMsQ0FBWjtBQUNEOztBQUVELFFBQUlKLFFBQVFDLFlBQVIsS0FBeUIsV0FBN0IsRUFBMEM7QUFDeENvQixrQkFBWSx5QkFBVUEsU0FBVixDQUFaO0FBQ0QsS0FGRCxNQUVPLElBQUlyQixRQUFRQyxZQUFSLEtBQXlCLFdBQXpCLElBQXdDRCxRQUFRQyxZQUFSLEtBQXlCLFdBQXJFLEVBQWtGO0FBQ3ZGb0Isa0JBQVlyQixRQUFRQyxZQUFSLEtBQXlCLFdBQXpCLEdBQXVDb0IsVUFBVUUsV0FBVixFQUF2QyxHQUFpRUYsVUFBVUcsV0FBVixFQUE3RTtBQUNELEtBRk0sTUFFQSxJQUFJLE9BQU94QixRQUFRQyxZQUFmLEtBQWdDLFVBQXBDLEVBQWdEO0FBQ3JEb0Isa0JBQVlyQixRQUFRQyxZQUFSLENBQXFCb0IsU0FBckIsQ0FBWjtBQUNEOztBQUVELFFBQUlyQixRQUFRTSxLQUFaLEVBQW1CO0FBQ2pCLFVBQUlOLFFBQVFNLEtBQVIsQ0FBY0MsTUFBZCxJQUF3QmEsWUFBWUYsT0FBWixDQUFvQixHQUFwQixNQUE2QixDQUF6RCxFQUE0RDtBQUMxRCxZQUFJO0FBQ0ZFLHdCQUFjSyxLQUFLbkIsS0FBTCxDQUFXYyxXQUFYLENBQWQ7QUFDRCxTQUZELENBRUUsT0FBT00sQ0FBUCxFQUFVO0FBQ1YsZ0JBQU1DLGlDQUErQlYsR0FBL0IsK0JBQU47QUFDRDtBQUNGLE9BTkQsTUFNTyxJQUFJakIsUUFBUU0sS0FBUixDQUFjRSxLQUFkLElBQXVCWSxZQUFZRixPQUFaLENBQW9CLEdBQXBCLE1BQTZCLENBQXhELEVBQTJEO0FBQ2hFLFlBQUk7QUFDRkUsd0JBQWNLLEtBQUtuQixLQUFMLENBQVdjLFdBQVgsQ0FBZDtBQUNELFNBRkQsQ0FFRSxPQUFPTSxDQUFQLEVBQVU7QUFDVixnQkFBTUMsaUNBQStCVixHQUEvQiwrQkFBTjtBQUNEO0FBQ0YsT0FOTSxNQU1BLElBQUlqQixRQUFRTSxLQUFSLENBQWNJLEdBQWQsSUFBcUIsUUFBUWtCLElBQVIsQ0FBYVIsV0FBYixDQUF6QixFQUFvRDtBQUN6REEsc0JBQWNTLFNBQVNULFdBQVQsRUFBc0IsRUFBdEIsQ0FBZDtBQUNELE9BRk0sTUFFQSxJQUFJcEIsUUFBUU0sS0FBUixDQUFjSyxLQUFkLElBQXVCLGlCQUFpQmlCLElBQWpCLENBQXNCUixXQUF0QixDQUEzQixFQUErRDtBQUNwRUEsc0JBQWNVLFdBQVdWLFdBQVgsQ0FBZDtBQUNELE9BRk0sTUFFQSxJQUFJcEIsUUFBUU0sS0FBUixDQUFjRyxJQUFkLEtBQXVCVyxZQUFZRyxXQUFaLE9BQThCLE1BQTlCLElBQXdDSCxZQUFZRyxXQUFaLE9BQThCLE9BQTdGLENBQUosRUFBMkc7QUFDaEhILHNCQUFjQSxZQUFZRyxXQUFaLE9BQThCLE1BQTVDO0FBQ0Q7QUFDRjs7QUFFRHJCLGNBQVVtQixTQUFWLElBQXVCRCxXQUF2QjtBQUNELEdBdkNEO0FBd0NBLFNBQU9sQixTQUFQO0FBQ0QsQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjYW1lbGNhc2UgZnJvbSAnY2FtZWxjYXNlJztcbmltcG9ydCBtZXJnZSBmcm9tICdsb2Rhc2gvbWVyZ2UnO1xuXG5leHBvcnQgZGVmYXVsdCAob3B0aW9ucywgdHJhbnNmb3JtS2V5ID0gJ2NhbWVsY2FzZScpID0+IHtcbiAgY29uc3QgdmFyaWFibGVzID0ge307XG4gIGNvbnN0IGRlZmF1bHRPcHRpb25zID0ge1xuICAgIHByZWZpeDogbnVsbCxcbiAgICByZW1vdmVQcmVmaXg6IHRydWUsXG4gICAgdHJhbnNmb3JtS2V5OiAnY2FtZWxjYXNlJyxcbiAgICBwYXJzZToge1xuICAgICAgb2JqZWN0OiB0cnVlLFxuICAgICAgYXJyYXk6IHRydWUsXG4gICAgICBib29sOiB0cnVlLFxuICAgICAgaW50OiB0cnVlLFxuICAgICAgZmxvYXQ6IHRydWUsXG4gICAgfSxcbiAgICBmaWx0ZXI6IG51bGwsXG4gIH07XG5cbiAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnc3RyaW5nJykge1xuICAgIG9wdGlvbnMgPSB7XG4gICAgICBwcmVmaXg6IG9wdGlvbnMsXG4gICAgICB0cmFuc2Zvcm1LZXksXG4gICAgfTtcbiAgfVxuXG4gIG9wdGlvbnMgPSBtZXJnZShkZWZhdWx0T3B0aW9ucywgb3B0aW9ucyk7XG5cbiAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyhwcm9jZXNzLmVudik7XG5cbiAgaWYgKG9wdGlvbnMuZmlsdGVyKSB7XG4gICAga2V5cyA9IGtleXMuZmlsdGVyKG9wdGlvbnMuZmlsdGVyKTtcbiAgfSBlbHNlIGlmIChvcHRpb25zLnByZWZpeCkge1xuICAgIGtleXMgPSBrZXlzLmZpbHRlcihrZXkgPT4ga2V5LmluZGV4T2Yob3B0aW9ucy5wcmVmaXgpID09PSAwKTtcbiAgfVxuXG4gIGtleXMuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgbGV0IG9wdGlvblZhbHVlID0gcHJvY2Vzcy5lbnZba2V5XTtcbiAgICBsZXQgb3B0aW9uS2V5ID0ga2V5O1xuXG4gICAgaWYgKG9wdGlvbnMucmVtb3ZlUHJlZml4KSB7XG4gICAgICBvcHRpb25LZXkgPSBvcHRpb25LZXkucmVwbGFjZShgJHtvcHRpb25zLnByZWZpeH1fYCwgJycpO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLnRyYW5zZm9ybUtleSA9PT0gJ2NhbWVsY2FzZScpIHtcbiAgICAgIG9wdGlvbktleSA9IGNhbWVsY2FzZShvcHRpb25LZXkpO1xuICAgIH0gZWxzZSBpZiAob3B0aW9ucy50cmFuc2Zvcm1LZXkgPT09ICdsb3dlcmNhc2UnIHx8IG9wdGlvbnMudHJhbnNmb3JtS2V5ID09PSAndXBwZXJjYXNlJykge1xuICAgICAgb3B0aW9uS2V5ID0gb3B0aW9ucy50cmFuc2Zvcm1LZXkgPT09ICdsb3dlcmNhc2UnID8gb3B0aW9uS2V5LnRvTG93ZXJDYXNlKCkgOiBvcHRpb25LZXkudG9VcHBlckNhc2UoKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBvcHRpb25zLnRyYW5zZm9ybUtleSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgb3B0aW9uS2V5ID0gb3B0aW9ucy50cmFuc2Zvcm1LZXkob3B0aW9uS2V5KTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy5wYXJzZSkge1xuICAgICAgaWYgKG9wdGlvbnMucGFyc2Uub2JqZWN0ICYmIG9wdGlvblZhbHVlLmluZGV4T2YoJ3snKSA9PT0gMCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIG9wdGlvblZhbHVlID0gSlNPTi5wYXJzZShvcHRpb25WYWx1ZSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICB0aHJvdyBFcnJvcihgRW52aXJvbm1lbnQgVmFyaWFibGUgXCIke2tleX1cIiBoYXMgaW52YWxpZCBKU09OIGlucHV0LmApO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKG9wdGlvbnMucGFyc2UuYXJyYXkgJiYgb3B0aW9uVmFsdWUuaW5kZXhPZignWycpID09PSAwKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgb3B0aW9uVmFsdWUgPSBKU09OLnBhcnNlKG9wdGlvblZhbHVlKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIHRocm93IEVycm9yKGBFbnZpcm9ubWVudCBWYXJpYWJsZSBcIiR7a2V5fVwiIGhhcyBpbnZhbGlkIEpTT04gaW5wdXQuYCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAob3B0aW9ucy5wYXJzZS5pbnQgJiYgL15cXGQrJC8udGVzdChvcHRpb25WYWx1ZSkpIHtcbiAgICAgICAgb3B0aW9uVmFsdWUgPSBwYXJzZUludChvcHRpb25WYWx1ZSwgMTApO1xuICAgICAgfSBlbHNlIGlmIChvcHRpb25zLnBhcnNlLmZsb2F0ICYmIC9eLT9cXGQqKFxcLlxcZCspJC8udGVzdChvcHRpb25WYWx1ZSkpIHtcbiAgICAgICAgb3B0aW9uVmFsdWUgPSBwYXJzZUZsb2F0KG9wdGlvblZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAob3B0aW9ucy5wYXJzZS5ib29sICYmIChvcHRpb25WYWx1ZS50b0xvd2VyQ2FzZSgpID09PSAndHJ1ZScgfHwgb3B0aW9uVmFsdWUudG9Mb3dlckNhc2UoKSA9PT0gJ2ZhbHNlJykpIHtcbiAgICAgICAgb3B0aW9uVmFsdWUgPSBvcHRpb25WYWx1ZS50b0xvd2VyQ2FzZSgpID09PSAndHJ1ZSc7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyaWFibGVzW29wdGlvbktleV0gPSBvcHRpb25WYWx1ZTtcbiAgfSk7XG4gIHJldHVybiB2YXJpYWJsZXM7XG59O1xuIl19