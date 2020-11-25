import { upperCaseFirst } from './textTransform';

describe('upperCaseFirst function', () => {
  it('should return an empty string if the input is an empty string', () => {
    const str: String = '';
    const result = upperCaseFirst(str);
    expect(result).toBe('');
  });

  it('should convert the first character in the string to uppercase', () => {
    const str: String = 'minute';
    const result = upperCaseFirst(str);
    expect(result).toBe('Minute');
  });
});
