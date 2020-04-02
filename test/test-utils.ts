const TEST_INPUT: Record<string, string> = {
  EXAMPLE_OBJECT: '{"prop": "value"}',
  EXAMPLE_ARRAY: '[1,2,3, "string", {"prop": "value"}, 5.2]',
  EXAMPLE_INVALID_OBJECT: '{"prop": }"value"}',
  EXAMPLE_INVALID_ARRAY: '[1,2,3, "string", ]{"prop": "value"}, 5.2]',
  EXAMPLE_TRUE: 'true',
  EXAMPLE_FALSE: 'false',
  EXAMPLE_INT: '5',
  EXAMPLE_FLOAT: '5.2456',
  EXAMPLE_STRING: 'example',
};

const TEST_OUTPUT: Record<string, any> = {
  object: { prop: 'value' },
  array: [1, 2, 3, 'string', { prop: 'value' }, 5.2],
  invalidObject: '{"prop": }"value"}',
  invalidArray: '[1,2,3, "string", ]{"prop": "value"}, 5.2]',
  true: true,
  false: false,
  int: 5,
  float: 5.2456,
  string: 'example',
};

const EXTRA_INPUT = {
  EXAMPLE_CONVERTS_CAMELCASE: 'camelCase',
  EXAMPLE_CONVERTS_LOWERCASE: 'lowercase',
  // eslint-disable-next-line @typescript-eslint/camelcase
  EXAMPLE_converts_uppercase: 'uppercase',
  EXAMPLE_EXAMPLE_KEY: 'exampleExample',
  // eslint-disable-next-line @typescript-eslint/camelcase
  EXAMPLE_DoNT_TRanSFoRM_ME: 'dontTransform',
  EXAMPLE_SUB_INT: '7',
  EXAMPLE_SUB_STRING: 'subExample',
};

const EXTRA_OUTPUT = {
  convertsCamelcase: 'camelCase',
  convertsLowercase: 'lowercase',
  convertsUppercase: 'uppercase',
  exampleKey: 'exampleExample',
  doNtTRanSFoRmMe: 'dontTransform',
  subInt: 7,
  subString: 'subExample',
};

const cleanEnvVariables = (vars = TEST_INPUT) => {
  const testVariableKeys = Object.keys(vars);
  testVariableKeys.forEach((key) => {
    delete process.env[key];
  });
};

const initEnvVariables = (vars = TEST_INPUT) => {
  cleanEnvVariables();

  const testVariableKeys = Object.keys(vars);
  testVariableKeys.forEach((key) => {
    process.env[key] = vars[key];
  });
};

export {
  TEST_INPUT,
  TEST_OUTPUT,
  EXTRA_INPUT,
  EXTRA_OUTPUT,
  initEnvVariables,
  cleanEnvVariables,
};
