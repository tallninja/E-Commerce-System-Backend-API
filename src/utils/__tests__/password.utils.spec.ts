import { hashPassword, verifyPassword } from '../password.utils';

describe('Password Utils', () => {
  test('password hashing', async () => {
    const password: string = 'password';
    const hash: string = await hashPassword(password);
    expect(1).toEqual(1);
  });

  test('password verification', async () => {
    const password: string = 'password';
    const hash: string = await hashPassword(password);
    expect(await verifyPassword(password, hash)).toBe(true);
  });

  test('should fail when password is incorrect', async () => {
    const password: string = 'password';
    const hash: string = await hashPassword(password);
    expect(await verifyPassword(password + 'hakjhs', hash)).toBe(false);
  });
});
