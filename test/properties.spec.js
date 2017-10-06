import test from 'ava';
import { initFakeEnvVariables } from './utils';
import parseEnvVars from '../dist';

initFakeEnvVariables();

test('Transforms keys to camelcase', (t) => {
  const options = parseEnvVars('EXAMPLE');
  t.true(options.convertsCamelcase === 'camelCase');
});

test('Transforms keys to lowercase', (t) => {
  const options = parseEnvVars('EXAMPLE', 'lowercase');
  t.true(options.converts_lowercase === 'lowercase');
});

test('Transforms keys to uppercase', (t) => {
  const options = parseEnvVars('EXAMPLE', 'uppercase');
  t.true(options.CONVERTS_UPPERCASE === 'uppercase');
});

test('Includes prefix', (t) => {
  const options = parseEnvVars({
    prefix: 'EXAMPLE',
    includePrefix: true,
  });

  t.true(options.exampleConvertsCamelcase === 'camelCase');
});
