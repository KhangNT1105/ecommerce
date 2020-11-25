import { checkPagePermissisons } from './permissions';

describe('checkPagePermissisons', () => {
  test('check permission', () => {
    const res = checkPagePermissisons('test', 'path', []);
    expect(res).toBe(true);
  });
});
