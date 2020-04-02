import { initEnvVariables, TEST_OUTPUT } from '../test-utils';
import { readEnv } from '../../src';
import { defaultOptions } from '../../src/utils';

describe('Given options argument was not provided', () => {
  it('should use default options and read "process.env" as source', () => {
    // Arrange
    initEnvVariables();
    const resultWithDefaultOptions = readEnv('EXAMPLE', defaultOptions);

    // Act
    const resultWithoutOptions = readEnv('EXAMPLE');

    // Assert
    expect(resultWithoutOptions).toEqual(resultWithDefaultOptions);
    expect(resultWithoutOptions).toEqual(TEST_OUTPUT);
    expect(resultWithoutOptions).toMatchSnapshot();
  });
});
