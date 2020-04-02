# read-env

> Transform environment variables into JSON object with sanitized values.

[![NPM version](https://badge.fury.io/js/read-env.svg)](https://www.npmjs.com/package/read-env)
[![npm](https://img.shields.io/npm/dt/read-env.svg)](https://www.npmjs.com/package/read-env)
[![Coverage Status](https://coveralls.io/repos/github/yatki/read-env/badge.svg?branch=master&)](https://coveralls.io/github/yatki/read-env?branch=master)
[![Dependencies](https://david-dm.org/yatki/read-env/status.svg)](https://david-dm.org/yatki/read-env)

> See docs for previous version [v1.3.x](https://github.com/yatki/read-env/tree/v1.3.0).

Main purpose of this library is to allow developers to configure their applications with environment variables. See: [a use case example](#use-case-example).

## What's New with v2.x 🚀

- Migrated to Typescript, Yay! 🎉
- Simplified API
- With new `separator` option,nested object constructions are possible.
- New `source` option allows you to use other objects, other than `process.env`

## Migrating from v1.x to v2.x

- `default` export is **deprecated**. Please use named export `readEnv` as below:

```js
const { readEnv } = require('read-env');
// Or
import { readEnv } from 'read-env';
// Or in browser
window.readEnv('EXAMPLE');
```

- `parse` option was renamed as `sanitize`.
- `transformKey` option was renamed as `format`.
- Deprecated options: `ignoreInvalidJSON`, `prefix`, `filter`,

## Install

```
npm install --save read-env
```

or

```
yarn add read-env
```

## Basic Usage

Let's say you have some environment variables starting with prefix "**EXAMPLE\_**" like below:

```text
EXAMPLE_OBJECT='{"prop": "value"}'
EXAMPLE_ARRAY='[1,2,3, "string", {"prop": "value"}, 5.2]'
EXAMPLE_INVALID_OBJECT='{"prop": }"value"}'
EXAMPLE_INVALID_ARRAY='[1,2,3, "string", ]{"prop": "value"}, 5.2]'
EXAMPLE_TRUE='true'
EXAMPLE_FALSE='false'
EXAMPLE_INT='5'
EXAMPLE_NEGATIVE_INT='-11'
EXAMPLE_FLOAT='5.2456'
EXAMPLE_NEGATIVE_FLOAT='-2.4567'
EXAMPLE_INT_ZERO='0'
EXAMPLE_FLOAT_ZERO='0.00'
EXAMPLE_NEGATIVE_INT_ZERO='-0'
EXAMPLE_NEGATIVE_FLOAT_ZERO='-0.00'
EXAMPLE_STRING='example'
EXAMPLE_DEEP__OBJECT__PROPERTY='value'
```

app.js

```js
import { readEnv } from 'read-env';

const result = readEnv('EXAMPLE');
console.log(result);
```

Result:

```json
{
  "object": { "prop": "value" },
  "array": [1, 2, 3, "string", { "prop": "value" }, 5.2],
  "invalidObject": "{\"prop\": }\"value\"}",
  "invalidArray": "[1,2,3, \"string\", ]{\"prop\": \"value\"}, 5.2]",
  "true": true,
  "false": false,
  "int": 5,
  "negativeInt": -11,
  "float": 5.2456,
  "negativeFloat": -2.4567,
  "intZero": 0,
  "floatZero": 0,
  "negativeIntZero": -0,
  "negativeFloatZero": -0,
  "string": "example",
  "deep": {
    "object": {
      "property": "value"
    }
  }
}
```

## API

### `readEnv(prefix?: string, options: ReadEnvOptions = {})`

**Input:**

- `prefix` (type: `string`, default: `undefined`): filters environment variables by prefix
- `options` (type: `ReadEnvOptions`, default: `{}`): options object to change function's behaviour

**Returns:** `object` (type: _Record<string,any>_), returns the instance, so add methods are chainable.

### Options

**Default Options:**

```js
{
  "source": process.env,
  "format": "camelcase",
  "separator": "__",
  "sanitize": {
    "object": true,
    "array": true,
    "bool": true,
    "int": true,
    "float": true
  },
  "includePrefix": false
}
```

- [`options.source`](#optionssource)
- [`options.format`](#optionsformat)
- [`options.separator`](#optionsseparator)
- [`options.sanitize`](#optionssanitize)
- [`options.includePrefix`](#optionsincludeprefix)

#### `options.source`

- Type: `object`
- Default: `process.env`

The source object that will be filtered, sanitized and formatted.

**Type Signature:**

```ts
interface Source {
  [key: string]: string | undefined;
}
```

#### `options.format`

- Type: `boolean | string | function`
- Default: `camelcase`

Format environment variable name.

It's value can be:

- a `boolean`, if set to `false`, formatting is disabled
- a `string`, one of which `camelcase`, `pascalcase`, `lowercase`, `uppercase`
- a `function`, with `(rawVarName: string) => string` type signature

#### `options.separator`

- Type: `boolean | string`
- Default: `__`

Allows you construct nested objects from environment variable name.

- If set to `false`, constructing nested objects is disabled

**Example:**

```js
const { readEnv } = require('read-env');

const testInput = {
  EXAMPLE_DEEP__OBJECT_PROPERTY1: 'value1',
  EXAMPLE_DEEP__OBJECT_PROPERTY2: 'value2',
};

const result = readEnv('EXAMPLE', {
  source: testInput,
});
console.log(result);
```

Result:

```json
{
  "deep": {
    "object": {
      "property1": "value1",
      "property2": "value2"
    }
  }
}
```

#### `options.sanitize`

- Type: `boolean | object`,
- Default: `{}`

Sanitize object consists of following properties which is used to

- `object` (type: _bool_, default: _true_): sanitize stringified object

  > value must be valid JSON input, see: [JSON.parse](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse#Using_JSON.parse()>).

- `array` (type: _bool_, default: _true_): sanitize stringified array
  > value must be valid JSON input, see: [JSON.parse](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse#Using_JSON.parse()>).
- `int` (type: _bool_, default: _true_): sanitize numbers into integer
  > value must be consist of only digits.
- `float` (type: _bool_, default: _true_): sanitize numbers into float
  > value must be consist of only digits with decimal point.
- `bool` (type: _bool_, default: _true_): sanitize value into boolean
  > value must have case insensitive match with "true" or "false".

#### `options.includePrefix`

- Type: `boolean`
- Default: `false`

If set to true, keeps the given prefix in property names.

## Use Case Example

In past, I used [Nightmare](https://github.com/segmentio/nightmare) for _acceptance testing_ and tests had different configurations based on the
environment they were running on.

So, I simply used read-env, and nightmare is fully configurable with environment variables :)

```js
import Nightmare from 'nightmare';
import { readEnv } from 'read-env';

const nightmareConfig = readEnv('MY_NIGHTMARE');
const nightmare = Nightmare(nightmareConfig);
```

Instead of writing code like below:

```js
import Nightmare from 'nightmare';

const nightmare = Nightmare({
  show: process.env.MY_NIGHTMARE_SHOW || false,
  width: process.env.MY_NIGHTMARE_WIDTH || 1280,
  height: process.env.MY_NIGHTMARE_HEIGHT || 720,
  typeInterval: process.env.MY_NIGHTMARE_TYPE_INTERVAL || 50,
  //... other properties go forever
});
```

## Contribution

As always, I'm open to any contribution and would like to hear your feedback.

### Just an important reminder:

If you are planning to contribute to **any** open source project,
before starting development, please **always open an issue** and **make a proposal first**.
This will save you from working on features that are eventually going to be rejected for some reason.

## LICENCE

MIT (c) 2020 Mehmet Yatkı
