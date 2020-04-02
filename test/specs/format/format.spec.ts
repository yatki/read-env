import { readEnv } from '../../../src';
import { FORMAT_INPUT, FORMAT_OUTPUT } from '../../test-utils';

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
      // eslint-disable-next-line @typescript-eslint/camelcase
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
      // eslint-disable-next-line @typescript-eslint/camelcase
      my_key1: 'dummyValue',
      // eslint-disable-next-line @typescript-eslint/camelcase
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
      // eslint-disable-next-line @typescript-eslint/camelcase
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
    const ucFirst = (string: string): string =>
      string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    const testInput = {
      // eslint-disable-next-line @typescript-eslint/camelcase
      EXAMPLE_mY_key1: 'dummyValue',
      EXAMPLE_MY_KEY2: 'dummyValue',
    };

    const testOutput = {
      // eslint-disable-next-line @typescript-eslint/camelcase
      My_key1: 'dummyValue',
      // eslint-disable-next-line @typescript-eslint/camelcase
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
