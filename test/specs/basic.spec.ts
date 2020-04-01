import { initFakeEnvVariables, TEST_OUTPUT } from '../utils';
import { readEnv } from '../../src';
import { defaultOptions } from '../../src/utils';

describe('Given options argument was not provided', () => {
  beforeEach(() => {
    initFakeEnvVariables();
  });

  it('should return an object with sanitized values', () => {
    // Act
    const resultWithoutOptions = readEnv('EXAMPLE');

    // Assert
    expect(resultWithoutOptions).toEqual(TEST_OUTPUT);
    expect(resultWithoutOptions).toMatchSnapshot();
  });

  it('should return the result based on default options', () => {
    // Arrange
    const resultWithDefaultOptions = readEnv('EXAMPLE', defaultOptions);

    // Act
    const resultWithoutOptions = readEnv('EXAMPLE');

    // Assert
    expect(resultWithoutOptions).toEqual(resultWithDefaultOptions);
  });
});
