import test from 'ava';
import { initFakeEnvVariables, PARSED_VALUES } from './utils';
import parseEnvVars from '../src';

initFakeEnvVariables();

test('Parses Object', (t) => {
  const options = parseEnvVars('EXAMPLE');
  t.deepEqual(options.object, PARSED_VALUES.EXAMPLE_OBJECT);
});

test('Parses Array', (t) => {
  const options = parseEnvVars('EXAMPLE');
  t.deepEqual(options.array, PARSED_VALUES.EXAMPLE_ARRAY);
});

test('Parses Boolean', (t) => {
  const options = parseEnvVars('EXAMPLE');
  t.true(options.true === PARSED_VALUES.EXAMPLE_TRUE);
  t.true(options.false === PARSED_VALUES.EXAMPLE_FALSE);
});

test('Parses Int', (t) => {
  const options = parseEnvVars('EXAMPLE');
  t.true(options.int === PARSED_VALUES.EXAMPLE_INT);
});

test('Parses Float', (t) => {
  const options = parseEnvVars('EXAMPLE');
  t.true(options.float === PARSED_VALUES.EXAMPLE_FLOAT);
});
