const TEST_VARIABLES = {
  EXAMPLE_OBJECT: '{"prop": "value"}',
  EXAMPLE_ARRAY: '[1,2,3, "string", {"prop": "value"}, 5.2]',
  EXAMPLE_TRUE: 'true',
  EXAMPLE_FALSE: 'false',
  EXAMPLE_INT: '5',
  EXAMPLE_FLOAT: '5.2',
  EXAMPLE_STRING: 'example',
  EXAMPLE_CONVERTS_CAMELCASE: 'camelCase',
  EXAMPLE_CONVERTS_LOWERCASE: 'lowercase',
  EXAMPLE_converts_uppercase: 'uppercase',
};

const PARSED_VALUES = {
  EXAMPLE_OBJECT: { prop: 'value' },
  EXAMPLE_ARRAY: [1, 2, 3, 'string', { prop: 'value' }, 5.2],
  EXAMPLE_TRUE: true,
  EXAMPLE_FALSE: false,
  EXAMPLE_INT: 5,
  EXAMPLE_FLOAT: 5.2,
  EXAMPLE_STRING: 'example',
  EXAMPLE_CONVERTS_CAMELCASE: 'camelCase',
  EXAMPLE_CONVERTS_LOWERCASE: 'lowercase',
  EXAMPLE_converts_uppercase: 'uppercase',
};

const initFakeEnvVariables = () => {
  const testVariableKeys = Object.keys(TEST_VARIABLES);
  testVariableKeys.forEach((key) => {
    process.env[key] = TEST_VARIABLES[key];
  });
};

export {
  TEST_VARIABLES,
  PARSED_VALUES,
  initFakeEnvVariables,
};
