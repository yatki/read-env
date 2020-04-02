import { readEnv } from '../../../src';

describe('Given env variable name matches nested object notation', () => {
  it('should split keys by separator and create a nested object', () => {
    // Arrange

    const testInput = {
      EXAMPLE_my_key1__my_sub_key1__my_sub_sub_key1: 'dummyValue1',
      EXAMPLE_MY_KEY2__my_sub_key2__my_sub_sub_key2: 'dummyValue2',
    };

    const testOutput = {
      myKey1: {
        mySubKey1: {
          mySubSubKey1: 'dummyValue1',
        },
      },
      myKey2: {
        mySubKey2: {
          mySubSubKey2: 'dummyValue2',
        },
      },
    };
    // Act
    const result = readEnv('EXAMPLE', {
      source: testInput,
    });

    // Assert
    expect(result).toEqual(testOutput);
  });
});

describe('Given separator is a custom string', () => {
  it('should format all nested object property names', () => {
    // Arrange

    const testInput = {
      EXAMPLE_my_key1$$my_sub_key1$$my_sub_sub_key1: 'dummyValue1',
      EXAMPLE_MY_KEY2$$my_sub_key2$$my_sub_sub_key2: 'dummyValue2',
    };

    const testOutput = {
      my_key1: {
        my_sub_key1: {
          my_sub_sub_key1: 'dummyValue1',
        },
      },
      my_key2: {
        my_sub_key2: {
          my_sub_sub_key2: 'dummyValue2',
        },
      },
    };
    // Act
    const result = readEnv('EXAMPLE', {
      source: testInput,
      format: 'lowercase',
      separator: '$$',
    });

    // Assert
    expect(result).toEqual(testOutput);
  });
});

describe('Given separator is set to "false"', () => {
  it('should NOT create nested objects', () => {
    // Arrange

    const testInput = {
      EXAMPLE_x: 'willNotBeOverwritten',
      EXAMPLE_x__y__z: 'dummyValue1',
      EXAMPLE_x__a__b: 'dummyValue2',
    };

    const testOutput = {
      x: 'willNotBeOverwritten',
      xYZ: 'dummyValue1',
      xAB: 'dummyValue2',
    };
    // Act
    const result = readEnv('EXAMPLE', {
      source: testInput,
      separator: false,
    });

    // Assert
    expect(result).toEqual(testOutput);
  });
});

describe('Given some nested objects belong to same parents', () => {
  it('should merge child objects', () => {
    // Arrange

    const testInput = {
      EXAMPLE_x: 'willBeOverwritten',
      EXAMPLE_x__y__z: 'dummyValue1',
      EXAMPLE_x__a__b: 'dummyValue2',
    };

    const testOutput = {
      x: {
        y: {
          z: 'dummyValue1',
        },
        a: {
          b: 'dummyValue2',
        },
      },
    };
    // Act
    const result = readEnv('EXAMPLE', {
      source: testInput,
    });

    // Assert
    expect(result).toEqual(testOutput);
  });
});

describe('Given a parent key was defined previously', () => {
  it('should overwrite the parent that is not object', () => {
    // Arrange
    const testInput = {
      // String
      EXAMPLE_x1: 'willBeOverwritten',
      EXAMPLE_x1__y__z: 'dummyValue1',
      // Array
      EXAMPLE_x2: '["dummyValue2"]',
      EXAMPLE_x2__a__b: 'dummyValue2',

      // Object
      EXAMPLE_x3: '{"will": "keep"}',
      EXAMPLE_x3__k__l: 'dummyValue3',
    };

    const testOutput = {
      x1: {
        y: {
          z: 'dummyValue1',
        },
      },
      x2: {
        a: {
          b: 'dummyValue2',
        },
      },
      x3: {
        will: 'keep',
        k: { l: 'dummyValue3' },
      },
    };

    // Act
    const result = readEnv('EXAMPLE', {
      source: testInput,
    });

    // Assert
    expect(result).toEqual(testOutput);
  });
});
