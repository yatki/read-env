type Input = Record<string, string | undefined>;
type Output = Record<string, any>;

const SANITIZE_INPUT = {
  EXAMPLE_OBJECT: '{"prop": "value"}',
  EXAMPLE_ARRAY: '[1,2,3, "string", {"prop": "value"}, 5.2]',
  EXAMPLE_INVALID_OBJECT: '{"prop": }"value"}',
  EXAMPLE_INVALID_ARRAY: '[1,2,3, "string", ]{"prop": "value"}, 5.2]',
  EXAMPLE_TRUE: 'true',
  EXAMPLE_FALSE: 'false',
  EXAMPLE_INT: '5',
  EXAMPLE_NEGATIVE_INT: '-11',
  EXAMPLE_FLOAT: '5.2456',
  EXAMPLE_NEGATIVE_FLOAT: '-2.4567',
  EXAMPLE_INT_ZERO: '0',
  EXAMPLE_FLOAT_ZERO: '0.00',
  EXAMPLE_NEGATIVE_INT_ZERO: '-0',
  EXAMPLE_NEGATIVE_FLOAT_ZERO: '-0.00',
  EXAMPLE_STRING: 'example',
};

const SANITIZE_OUTPUT: Output = {
  object: { prop: 'value' },
  array: [1, 2, 3, 'string', { prop: 'value' }, 5.2],
  invalidObject: '{"prop": }"value"}',
  invalidArray: '[1,2,3, "string", ]{"prop": "value"}, 5.2]',
  true: true,
  false: false,
  int: 5,
  negativeInt: -11,
  float: 5.2456,
  negativeFloat: -2.4567,
  intZero: 0,
  floatZero: 0,
  negativeIntZero: -0,
  negativeFloatZero: -0,
  string: 'example',
};

const FORMAT_INPUT = {
  EXAMPLE_CONVERTS_CAMELCASE: 'camelCase',
  EXAMPLE_CONVERTS_LOWERCASE: 'lowercase',
  EXAMPLE_converts_uppercase: 'uppercase',
  EXAMPLE_EXAMPLE_KEY: 'exampleExample',
  EXAMPLE_DoNT_TRanSFoRM_ME: 'dontTransform',
  EXAMPLE_SUB_INT: '7',
  EXAMPLE_SUB_STRING: 'subExample',
  EXAMPLE_UNDEFINED: undefined,
};

const FORMAT_OUTPUT: Output = {
  convertsCamelcase: 'camelCase',
  convertsLowercase: 'lowercase',
  convertsUppercase: 'uppercase',
  exampleKey: 'exampleExample',
  dontTransformMe: 'dontTransform',
  subInt: 7,
  subString: 'subExample',
  undefined,
};

const ALL_INPUT = { ...SANITIZE_INPUT, ...FORMAT_INPUT };
const ALL_OUTPUT: Output = { ...SANITIZE_OUTPUT, ...FORMAT_OUTPUT };

const cleanEnvVariables = (vars: Input = ALL_INPUT) => {
  const testVariableKeys = Object.keys(vars);
  testVariableKeys.forEach((key) => {
    delete process.env[key];
  });
};

const initEnvVariables = (vars: Input = ALL_INPUT) => {
  cleanEnvVariables(vars);

  const testVariableKeys = Object.keys(vars);
  testVariableKeys.forEach((key) => {
    process.env[key] = vars[key];
  });
};

const ucFirst = (string: string, lowerRest = true): string =>
  string.charAt(0).toUpperCase() +
  (lowerRest ? string.slice(1).toLowerCase() : string.slice(1));

export {
  SANITIZE_INPUT,
  SANITIZE_OUTPUT,
  FORMAT_INPUT,
  FORMAT_OUTPUT,
  ALL_INPUT,
  ALL_OUTPUT,
  initEnvVariables,
  cleanEnvVariables,
  ucFirst,
};
