import { readEnv } from '../../../src';
import { FORMAT_INPUT, FORMAT_OUTPUT, ucFirst } from '../../test-utils';

describe('Given format is set to false', () => {
  it('should return all the keys as it is', () => {
    // Act
    const result = readEnv('EXAMPLE', {
      source: FORMAT_INPUT,
      sanitize: false,
      format: false,
      includePrefix: true,
    });

    // Assert
    expect(result).toEqual(FORMAT_INPUT);
  });
});

describe('Given format is "camelcase"', () => {
  it('should format keys camelcase style', () => {
    // Act
    const result = readEnv('EXAMPLE', {
      source: FORMAT_INPUT,
      format: 'camelcase',
    });

    // Assert
    expect(result).toEqual(FORMAT_OUTPUT);
  });
});

describe('Given format is "pascalcase"', () => {
  it('should format keys pascalcase style', () => {
    // Arrange
    const testInput = {
      EXAMPLE_MY_KEY1: 'dummyValue',
      EXAMPLE_MY_KEY2: 'dummyValue',
      EXAMPLE_MY_kEy3: 'dummyValue',
    };

    const testOutput = {
      MyKey1: 'dummyValue',
      MyKey2: 'dummyValue',
      MyKey3: 'dummyValue',
    };
    // Act
    const result = readEnv('EXAMPLE', {
      source: testInput,
      format: 'pascalcase',
    });

    // Assert
    expect(result).toEqual(testOutput);
  });
});

describe('Given format is "lowercase"', () => {
  it('should format keys lowercase style', () => {
    // Arrange
    const testInput = {
      EXAMPLE_MY_KEY1: 'dummyValue',
      EXAMPLE_MY_KEY2: 'dummyValue',
    };

    const testOutput = {
      my_key1: 'dummyValue',
      my_key2: 'dummyValue',
    };
    // Act
    const result = readEnv('EXAMPLE', {
      source: testInput,
      format: 'lowercase',
    });

    // Assert
    expect(result).toEqual(testOutput);
  });
});

describe('Given format is "uppercase"', () => {
  it('should format keys uppercase style', () => {
    // Arrange
    const testInput = {
      EXAMPLE_mY_key1: 'dummyValue',
      EXAMPLE_MY_KEY2: 'dummyValue',
    };

    const testOutput = {
      MY_KEY1: 'dummyValue',
      MY_KEY2: 'dummyValue',
    };
    // Act
    const result = readEnv('EXAMPLE', {
      source: testInput,
      format: 'uppercase',
    });

    // Assert
    expect(result).toEqual(testOutput);
  });
});

describe('Given format is custom function', () => {
  it('should return all the keys as it is', () => {
    // Arrange
    const testInput = {
      EXAMPLE_mY_key1: 'dummyValue',
      EXAMPLE_MY_KEY2: 'dummyValue',
    };

    const testOutput = {
      My_key1: 'dummyValue',
      My_key2: 'dummyValue',
    };
    // Act
    const result = readEnv('EXAMPLE', {
      source: testInput,
      format: ucFirst,
    });

    // Assert
    expect(result).toEqual(testOutput);
  });
});

describe('Given input contains nested object', () => {
  it('should format all nested keys', () => {
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
      format: 'camelcase',
    });

    // Assert
    expect(result).toEqual(testOutput);
  });
});
