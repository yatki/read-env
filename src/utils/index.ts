export * from './options';
export * from './format';
export * from './sanitize';

const trimLeft = (str: string, charList: string): string =>
  str.replace(new RegExp(`^[${charList}]+`), '');

export { trimLeft };
