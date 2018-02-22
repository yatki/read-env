# read-env
> Convert environment variables into JSON object with parsed values.

[![NPM version](https://badge.fury.io/js/read-env.svg)](https://www.npmjs.com/package/read-env)
[![Build Status](https://travis-ci.org/yatki/read-env.svg?branch=master)](https://travis-ci.org/yatki/read-env)
[![Coverage Status](https://coveralls.io/repos/github/yatki/read-env/badge.svg?branch=master&)](https://coveralls.io/github/yatki/read-env?branch=master)
[![npm](https://img.shields.io/npm/dt/read-env.svg)](https://www.npmjs.com/package/read-env)
[![Dependencies](https://david-dm.org/yatki/read-env/status.svg)](https://david-dm.org/yatki/read-env)

## Install

```
npm install --save read-env
```
or
```
yarn add read-env
```

## Basic Example

Let's say you have some environment variables starting with prefix "**EXAMPLE_**" like below:
```
EXAMPLE_OBJECT_KEY= '{"prop": "value"}',
EXAMPLE_ARRAY_KEY= '[1,2,3, "string", {"prop": "value"}, 5.2]',
EXAMPLE_TRUE_KEY= 'true',
EXAMPLE_FALSE_KEY= 'false',
EXAMPLE_INT_KEY= '5',
EXAMPLE_FLOAT_KEY= '5.2',
EXAMPLE_STRING_KEY= 'example',
```

your-app.js
```javascript
import readEnv from 'read-env';

const options = readEnv('EXAMPLE');
console.log(options);
```

Output:
```javascript
{ 
  arrayKey: [ 1, 2, 3, 'string', { prop: 'value' }, 5.2 ],
  falseKey: false,
  floatKey: 5.2,
  intKey: 5,
  objectKey: { prop: 'value' },
  stringKey: 'example',
  trueKey: true 
}

```

## Usage

### `readEnv(prefix = null, transformKey = 'camelcase')`
You can pass a string prefix as first paremeter like below:

```javascript
const options = readEnv('EXAMPLE');
// Output:
/**
{ 
  arrayKey: [ 1, 2, 3, 'string', { prop: 'value' }, 5.2 ],
  falseKey: false,
  floatKey: 5.2,
  intKey: 5,
  objectKey: { prop: 'value' },
  stringKey: 'example',
  trueKey: true 
}
*/

const optionsLower = readEnv('EXAMPLE', 'lowercase');
// Output:
/**
{ 
  array_key: [ 1, 2, 3, 'string', { prop: 'value' }, 5.2 ],
  false_key: false,
  float_key: 5.2,
  int_key: 5,
  object_key: { prop: 'value' },
  string_key: 'example',
  true_key: true 
}
*/

function ucfirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
const optionsUcfirst = readEnv('EXAMPLE', ucfirst);
// Output:
/**
{ 
  Array_key: [ 1, 2, 3, 'string', { prop: 'value' }, 5.2 ],
  False_key: false,
  Float_key: 5.2,
  Int_key: 5,
  Object_key: { prop: 'value' },
  String_key: 'example',
  True_key: true 
}
*/
```

### `readEnv(config)`
You can pass whole config object:

```javascript
function ucfirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

const options = readEnv({
  prefix: 'EXAMPLE',
  includePrefix: false,
  transformKey: ucfirst,
  parse: {
    array: false, //not gonna parse arrays
  }, //still gonna parse object, int, float and boolean
});
```

 You can also pass your own filter function:
```javascript
const options = readEnv({
  filter: (envVarName) => envVarName.indexOf('EXAMPLE') > 0 && envVarName === 'ANOTHER_REQUIRED_KEY',
});
```

## Config

Available Config Options:
- `prefix` (type: *string*, default: *null*): filters environment variables by prefix
- `includePrefix` (type: *bool*, default: *false*): set true if you want to keep prefix in property names.
- `transformKey` (type: *bool*|*string*|*function*, default: *'camelcase'*): transform environment variable name.
  1. `false`, doesn't transform the environment variable name.
  1. `camelcase`, transforms variable name to camelCase.
  1. `lowercase`, transforms variable name to lowercase.
  1. `uppercase`, transforms variable name to UPPERCASE.
  1. `fn(varName)`, you can write your own transformer function (*varName* will be provided **with** prefix, **if** *includePrefix* is *true*)
- `parse` (type: *bool*|*object*, default: *object*):
  1. `false`: returns raw environment variable value
  1. `{}`: allows you to define which value types are going to be parsed.
      - `object` (type: *bool*, default: *true*): parse stringified object (value must be valid JSON input, see: [JSON.parse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse#Using_JSON.parse())).
      - `array` (type: *bool*, default: *true*): parse stringified array (value must be valid JSON input, see: [JSON.parse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse#Using_JSON.parse())).
      - `int` (type: *bool*, default: *true*): parse numbers into integer (value must be consist of only digits).
      - `float` (type: *bool*, default: *true*): parse numbers into float (value must be consist of only digits with decimal point).
      - `bool` (type: *bool*, default: *true*): parse if value into bolean if it equals to *'true'* or *'false'* .
- `ignoreInvalidJSON` (type: *bool*, default: *true*): if set to false, throws exception when value is not a valid JSON input (parse.object or parse.array options must be set to true).
- `filter` (type: *null*|*function*, default: *null*): filters environment variables (overrides prefix rule).
  1. `null`, don't filter varaibles.
  1. `fn(envVarName, index)`, custom filter function (*envVarName* will be provided **without** any transformation).
  
## Use Case Example
Recently, I used [Nightmare](https://github.com/segmentio/nightmare) for *acceptance testing* and had several environments which have different configurations.
 
Instead of writing a code like below:

```javascript
import Nightmare from 'nightmare';

const nightmare = Nightmare({
  show: process.env.X_NIGHTMARE_SHOW || false,
  width:  process.env.X_NIGHTMARE_WIDTH || 1280,
  height:  process.env.X_NIGHTMARE_HEIGHT || 720,
  typeInterval:  process.env.X_NIGHTMARE_TYPE_INTERVAL || 50,
  //... other properties go forever
});
```

I wrote this, and nightmare is fully configurable with environment variables :)
```javascript
import Nightmare from 'nightmare';
import readEnv from 'read-env';

const nightmareConfig = readEnv('X_NIGHTMARE');
const nightmare = Nightmare(nightmareConfig);
```
        
## Contribution

As always, I'm open to any contribution and would like to hear your feedback. 

### Just an important reminder:

If you are planning to contribute to **any** open source project, 
before starting development, please **always open an issue** and **make a proposal first**. 
This will save you from working on features that are eventually going to be rejected for some reason.

## LICENCE

MIT (c) 2017 Mehmet Yatkı
