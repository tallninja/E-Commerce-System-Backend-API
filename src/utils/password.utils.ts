import { scrypt as _scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

const SALT_LENGTH: number = 16;
const HASH_LENGTH: number = 32;

export async function hashPassword(password: string): Promise<string> {
  const salt: string = randomBytes(SALT_LENGTH).toString('hex');
  const hash: Buffer = (await scrypt(password, salt, HASH_LENGTH)) as Buffer;
  return `${salt}.${hash.toString('hex')}`;
}

export async function verifyPassword(
  plainTextPassword: string,
  hashedPassword: string,
) {
  const [salt, hash] = hashedPassword.split('.');
  const hash2: Buffer = (await scrypt(
    plainTextPassword,
    salt,
    HASH_LENGTH,
  )) as Buffer;
  return hash2.toString('hex') === hash;
}
