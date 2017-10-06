import test from 'ava';
import { initFakeEnvVariables, TEST_VARIABLES } from './utils';
import parseEnvVars from '../dist';

initFakeEnvVariables();

test('Returns an object', (t) => {
  const options = parseEnvVars();
  t.true(typeof options === 'object');
});

test('Reads all environment variables without a prefix', (t) => {
  const options = parseEnvVars();
  t.true(Object.keys(options).length > Object.keys(TEST_VARIABLES).length);
});

test('Reads only environment variables matching the prefix', (t) => {
  const options = parseEnvVars('EXAMPLE');
  t.true(Object.keys(options).length === Object.keys(TEST_VARIABLES).length);
});
