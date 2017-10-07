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
  EXAMPLE_EXAMPLE_KEY: 'exampleExample',
  EXAMPLE_DoNT_TRanSFoRM_ME: 'dontTransform',
  EXAMPLE_SUB_INT: '7',
  EXAMPLE_SUB_STRING: 'subExample',
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
  EXAMPLE_EXAMPLE_KEY: 'exampleExample',
  EXAMPLE_DoNT_TRanSFoRM_ME: 'dontTransform',
  EXAMPLE_SUB_INT: 7,
  EXAMPLE_SUB_STRING: 'subExample',
};

if (!process) {
  process = { env: {} };
}

const cleanFakeEnvVariables = (vars = TEST_VARIABLES) => {
  const testVariableKeys = Object.keys(vars);
  testVariableKeys.forEach((key) => {
    delete process.env[key];
  });
};

const initFakeEnvVariables = (vars = TEST_VARIABLES) => {
  cleanFakeEnvVariables(vars);

  const testVariableKeys = Object.keys(vars);
  testVariableKeys.forEach((key) => {
    process.env[key] = vars[key];
  });
};

export {
  TEST_VARIABLES,
  PARSED_VALUES,
  initFakeEnvVariables,
};
