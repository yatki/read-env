import { readEnv } from '../../../src';
import { SANITIZE_INPUT, SANITIZE_OUTPUT } from '../../test-utils';

describe('Given sanitize is set to false', () => {
  it('should return all the values as it is', () => {
    // Act
    const result = readEnv('EXAMPLE', {
      source: SANITIZE_INPUT,
      sanitize: false,
      format: false,
      includePrefix: true,
    });

    // Assert
    expect(result).toEqual(SANITIZE_INPUT);
  });
});

describe('Given sanitize.object is set to false', () => {
  it('should return object json values as it is', () => {
    // Arrange
    const testOutput = {
      ...SANITIZE_OUTPUT,
      object: SANITIZE_INPUT.EXAMPLE_OBJECT,
    };

    // Act
    const result = readEnv('EXAMPLE', {
      source: SANITIZE_INPUT,
      sanitize: {
        object: false,
      },
    });

    // Assert
    expect(result).toEqual(testOutput);
  });
});

describe('Given sanitize.array is set to false', () => {
  it('should return array json values as it is', () => {
    // Arrange
    const testOutput = {
      ...SANITIZE_OUTPUT,
      array: SANITIZE_INPUT.EXAMPLE_ARRAY,
    };

    // Act
    const result = readEnv('EXAMPLE', {
      source: SANITIZE_INPUT,
      sanitize: {
        array: false,
      },
    });

    // Assert
    expect(result).toEqual(testOutput);
  });
});

describe('Given sanitize.int is set to false', () => {
  it('should return integer values as it is', () => {
    // Arrange
    const testOutput = { ...SANITIZE_OUTPUT, int: SANITIZE_INPUT.EXAMPLE_INT };

    // Act
    const result = readEnv('EXAMPLE', {
      source: SANITIZE_INPUT,
      sanitize: {
        int: false,
      },
    });

    // Assert
    expect(result).toEqual(testOutput);
  });
});

describe('Given sanitize.float is set to false', () => {
  it('should return float values as it is', () => {
    // Arrange
    const testOutput = {
      ...SANITIZE_OUTPUT,
      float: SANITIZE_INPUT.EXAMPLE_FLOAT,
    };

    // Act
    const result = readEnv('EXAMPLE', {
      source: SANITIZE_INPUT,
      sanitize: {
        float: false,
      },
    });

    // Assert
    expect(result).toEqual(testOutput);
  });
});

describe('Given sanitize.bool is set to false', () => {
  it('should return boolean values as it is', () => {
    // Arrange
    const testOutput = {
      ...SANITIZE_OUTPUT,
      true: SANITIZE_INPUT.EXAMPLE_TRUE,
      false: SANITIZE_INPUT.EXAMPLE_FALSE,
    };

    // Act
    const result = readEnv('EXAMPLE', {
      source: SANITIZE_INPUT,
      sanitize: {
        bool: false,
      },
    });

    // Assert
    expect(result).toEqual(testOutput);
  });
});
