import test from 'ava';
import { initFakeEnvVariables, TEST_VARIABLES, PARSED_VALUES } from './utils';
import readEnv from '../dist';

initFakeEnvVariables();

function ucfirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

test('Transforms keys to camelcase', (t) => {
  const options = readEnv('EXAMPLE');
  t.true(options.convertsCamelcase === PARSED_VALUES.EXAMPLE_CONVERTS_CAMELCASE);
});

test('Transforms keys to lowercase', (t) => {
  const options = readEnv('EXAMPLE', 'lowercase');
  t.true(options.converts_lowercase === PARSED_VALUES.EXAMPLE_CONVERTS_LOWERCASE);
});

test('Transforms keys to uppercase', (t) => {
  const options = readEnv('EXAMPLE', 'uppercase');
  t.true(options.CONVERTS_UPPERCASE === PARSED_VALUES.EXAMPLE_converts_uppercase);
});

test('Custom transform function as second parameter', (t) => {
  const options = readEnv('EXAMPLE', ucfirst);
  t.true(options.Converts_uppercase === PARSED_VALUES.EXAMPLE_converts_uppercase);
  t.true(options.Converts_lowercase === PARSED_VALUES.EXAMPLE_CONVERTS_LOWERCASE);
  t.true(options.Converts_camelcase === PARSED_VALUES.EXAMPLE_CONVERTS_CAMELCASE);
});

test('Custom transform function defined in config', (t) => {
  const options = readEnv({
    prefix: 'EXAMPLE',
    transformKey: ucfirst,
  });

  t.true(options.Converts_uppercase === PARSED_VALUES.EXAMPLE_converts_uppercase);
  t.true(options.Converts_lowercase === PARSED_VALUES.EXAMPLE_CONVERTS_LOWERCASE);
  t.true(options.Converts_camelcase === PARSED_VALUES.EXAMPLE_CONVERTS_CAMELCASE);
});

test('Doesn\'t transform key', (t) => {
  const options = readEnv('EXAMPLE', false);
  t.true(options.DoNT_TRanSFoRM_ME === PARSED_VALUES.EXAMPLE_DoNT_TRanSFoRM_ME);
});

test('Includes prefix', (t) => {
  const options = readEnv({
    prefix: 'EXAMPLE',
    removePrefix: false,
  });

  t.true(options.exampleConvertsCamelcase === 'camelCase');
});
