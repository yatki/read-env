import test from 'ava';
import { initFakeEnvVariables, TEST_VARIABLES } from './utils';
import readEnv from '../dist';

test.beforeEach(() => {
  initFakeEnvVariables();
});

test('Returns an object', (t) => {
  const options = readEnv();
  t.true(typeof options === 'object');
});

test('Reads all environment variables without a prefix', (t) => {
  const options = readEnv();
  t.true(Object.keys(options).length > Object.keys(TEST_VARIABLES).length);
});

test('Reads only environment variables matching the prefix', (t) => {
  const options = readEnv('EXAMPLE');
  t.true(Object.keys(options).length === Object.keys(TEST_VARIABLES).length);
});

test('Removes only first prefix', (t) => {
  const options = readEnv('EXAMPLE');
  t.true(options.exampleKey === TEST_VARIABLES.EXAMPLE_EXAMPLE_KEY);
});
