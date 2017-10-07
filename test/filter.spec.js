import test from 'ava';
import { initFakeEnvVariables, cleanFakeEnvVariables, PARSED_VALUES } from './utils';
import readEnv from '../dist';

test.beforeEach(() => {
  initFakeEnvVariables();
});

test('Filters', (t) => {
  const options = readEnv({
    filter: varName => varName.indexOf('EXAMPLE_SUB') === 0,
  });
  t.true(Object.keys(options).length === 2);
  t.is(options.exampleSubInt, PARSED_VALUES.EXAMPLE_SUB_INT);
  t.is(options.exampleSubString, PARSED_VALUES.EXAMPLE_SUB_STRING);
});

test('Filters with function not with prefix parameter', (t) => {
  const options = readEnv({
    prefix: 'EXAMPLE_CONVERTS',
    filter: varName => varName.indexOf('EXAMPLE_SUB') === 0,
  });

  t.true(Object.keys(options).length === 2);
  t.is(options.exampleSubInt, PARSED_VALUES.EXAMPLE_SUB_INT);
  t.is(options.exampleSubString, PARSED_VALUES.EXAMPLE_SUB_STRING);
});


test('Filters with function and removes prefix parameter', (t) => {
  const options = readEnv({
    prefix: 'EXAMPLE_SUB',
    filter: varName => varName.indexOf('EXAMPLE_SUB') === 0,
  });

  t.true(Object.keys(options).length === 2);
  t.is(options.int, PARSED_VALUES.EXAMPLE_SUB_INT);
  t.is(options.string, PARSED_VALUES.EXAMPLE_SUB_STRING);
});

test.afterEach(() => {
  cleanFakeEnvVariables();
});
