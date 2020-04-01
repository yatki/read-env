type TransformFunction = (str: string) => string;

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

type Format = 'none' | 'camelcase' | 'pascalcase' | 'lowercase' | 'uppercase';

interface ReadEnvOptions {
  source: Source;
  deepObjectSeparator: string;
  includePrefix: boolean;
  format: Format | TransformFunction;
  sanitize: boolean | SanitizeOptions;
  ignoreInvalidJSON: boolean;
}

export { ReadEnvOptions, Format, SanitizeOptions };
