import {
  initEnvVariables,
  ALL_INPUT,
  ALL_OUTPUT,
  ucFirst,
} from '../test-utils';
import { readEnv } from '../../src';
import { defaultOptions } from '../../src/utils';

describe('Given prefix argument was not provided', () => {
  it('should format and sanitize all given source without filtering', () => {
    // Arrange
    const testInput = {
      ...ALL_INPUT,
      NOT_MATCHING_KEY1: 'value1',
      NOT_MATCHING_KEY2: 'value2',
    };
    const testOutput = Object.keys(ALL_OUTPUT).reduce(
      (acc: Record<string, any>, item) => {
        acc[`example${ucFirst(item, false)}`] = ALL_OUTPUT[item];
        return acc;
      },
      {},
    );

    // Act
    const result = readEnv('', { source: testInput });

    // Assert
    expect(result).toEqual({
      ...testOutput,
      notMatchingKey1: 'value1',
      notMatchingKey2: 'value2',
    });
  });
});

describe('Given options argument was not provided', () => {
  it('should use default options and read "process.env" as source', () => {
    // Arrange
    initEnvVariables();
    const resultWithDefaultOptions = readEnv('EXAMPLE', defaultOptions);

    // Act
    const resultWithoutOptions = readEnv('EXAMPLE');

    // Assert
    expect(resultWithoutOptions).toEqual(resultWithDefaultOptions);
  });

  it('should sanitize all the values', () => {
    // Act
    const result = readEnv('EXAMPLE', {
      source: ALL_INPUT,
    });

    // Assert
    expect(result).toEqual(ALL_OUTPUT);
    expect(result).toMatchSnapshot();
  });

  it('should trim the underscores after the prefix', () => {
    // Arrange
    const testInput = {
      EXAMPLE__mY_key1: 'dummyValue',
      EXAMPLE_____MY_KEY2: 'dummyValue',
    };
    const testOutput = {
      myKey1: 'dummyValue',
      myKey2: 'dummyValue',
    };
    // Act
    const result = readEnv('EXAMPLE', {
      source: testInput,
    });

    // Assert
    expect(result).toEqual(testOutput);
  });
});
