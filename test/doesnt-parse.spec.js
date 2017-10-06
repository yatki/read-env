import test from 'ava';
import { initFakeEnvVariables, TEST_VARIABLES, PARSED_VALUES } from './utils';
import parseEnvVars from '../src';

initFakeEnvVariables();

test('Doesn\'t parse at all', (t) => {
  const options = parseEnvVars({
    prefix: 'EXAMPLE',
    parse: false,
  });

  t.true(options.object === TEST_VARIABLES.EXAMPLE_OBJECT);
  t.deepEqual(options.array, TEST_VARIABLES.EXAMPLE_ARRAY);
  t.true(options.int === TEST_VARIABLES.EXAMPLE_INT);
  t.true(options.float === TEST_VARIABLES.EXAMPLE_FLOAT);
  t.true(options.true === TEST_VARIABLES.EXAMPLE_TRUE);
  t.true(options.false === TEST_VARIABLES.EXAMPLE_FALSE);
  t.true(options.string === TEST_VARIABLES.EXAMPLE_STRING);
});

test('Doesn\'t parse object but parses rest', (t) => {
  const options = parseEnvVars({
    prefix: 'EXAMPLE',
    parse: {
      object: false,
    },
  });

  t.true(options.object === TEST_VARIABLES.EXAMPLE_OBJECT);

  // rest
  t.deepEqual(options.array, PARSED_VALUES.EXAMPLE_ARRAY);
  t.true(options.int === PARSED_VALUES.EXAMPLE_INT);
  t.true(options.float === PARSED_VALUES.EXAMPLE_FLOAT);
  t.true(options.true === PARSED_VALUES.EXAMPLE_TRUE);
  t.true(options.false === PARSED_VALUES.EXAMPLE_FALSE);
  t.true(options.string === PARSED_VALUES.EXAMPLE_STRING);
});


test('Doesn\'t parse array but parses rest', (t) => {
  const options = parseEnvVars({
    prefix: 'EXAMPLE',
    parse: {
      array: false,
    },
  });

  t.true(options.array === TEST_VARIABLES.EXAMPLE_ARRAY);

  // rest
  t.deepEqual(options.object, PARSED_VALUES.EXAMPLE_OBJECT);
  t.true(options.int === PARSED_VALUES.EXAMPLE_INT);
  t.true(options.float === PARSED_VALUES.EXAMPLE_FLOAT);
  t.true(options.true === PARSED_VALUES.EXAMPLE_TRUE);
  t.true(options.false === PARSED_VALUES.EXAMPLE_FALSE);
  t.true(options.string === PARSED_VALUES.EXAMPLE_STRING);
});

test('Doesn\'t parse int but parses rest', (t) => {
  const options = parseEnvVars({
    prefix: 'EXAMPLE',
    parse: {
      int: false,
    },
  });

  t.true(options.int === TEST_VARIABLES.EXAMPLE_INT);

  // rest
  t.deepEqual(options.object, PARSED_VALUES.EXAMPLE_OBJECT);
  t.deepEqual(options.array, PARSED_VALUES.EXAMPLE_ARRAY);
  t.true(options.float === PARSED_VALUES.EXAMPLE_FLOAT);
  t.true(options.true === PARSED_VALUES.EXAMPLE_TRUE);
  t.true(options.false === PARSED_VALUES.EXAMPLE_FALSE);
  t.true(options.string === PARSED_VALUES.EXAMPLE_STRING);
});

test('Doesn\'t parse float but parses rest', (t) => {
  const options = parseEnvVars({
    prefix: 'EXAMPLE',
    parse: {
      float: false,
    },
  });

  t.true(options.float === TEST_VARIABLES.EXAMPLE_FLOAT);

  // rest
  t.deepEqual(options.object, PARSED_VALUES.EXAMPLE_OBJECT);
  t.deepEqual(options.array, PARSED_VALUES.EXAMPLE_ARRAY);
  t.true(options.int === PARSED_VALUES.EXAMPLE_INT);
  t.true(options.true === PARSED_VALUES.EXAMPLE_TRUE);
  t.true(options.false === PARSED_VALUES.EXAMPLE_FALSE);
  t.true(options.string === PARSED_VALUES.EXAMPLE_STRING);
});

test('Doesn\'t parse boolean but parses rest', (t) => {
  const options = parseEnvVars({
    prefix: 'EXAMPLE',
    parse: {
      bool: false,
    },
  });

  t.true(options.true === TEST_VARIABLES.EXAMPLE_TRUE);
  t.true(options.false === TEST_VARIABLES.EXAMPLE_FALSE);

  // rest
  t.deepEqual(options.object, PARSED_VALUES.EXAMPLE_OBJECT);
  t.deepEqual(options.array, PARSED_VALUES.EXAMPLE_ARRAY);
  t.true(options.int === PARSED_VALUES.EXAMPLE_INT);
  t.true(options.string === PARSED_VALUES.EXAMPLE_STRING);
});
