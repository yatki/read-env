type FormatFunction = (str: string) => string;

interface Source {
  [key: string]: string | undefined;
}

interface SanitizeOptions {
  object?: boolean;
  array?: boolean;
  bool?: boolean;
  int?: boolean;
  float?: boolean;
}

type Format = 'camelcase' | 'pascalcase' | 'lowercase' | 'uppercase';

interface ReadEnvOptions {
  source: Source;
  separator: string;
  includePrefix: boolean;
  format: boolean | Format | FormatFunction;
  sanitize: boolean | SanitizeOptions;
  sort: boolean;
}

type ReadEnvResult = Record<string, any>;

export {
  ReadEnvOptions,
  Format,
  SanitizeOptions,
  FormatFunction,
  ReadEnvResult,
};
