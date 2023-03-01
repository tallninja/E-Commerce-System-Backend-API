import { scrypt as _scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

export const hashPassword = async (password: string) => {
  const salt = randomBytes(16).toString('hex');
  const hash = ((await scrypt(password, salt, 32)) as Buffer).toString('hex');
  return `${salt}.${hash}`;
};

export const verifyPassword = async (
  password: string,
  savedPassword: string
) => {
  const [salt, hash] = savedPassword.split('.');
  const calculatedHash = (
    (await scrypt(password, salt, 32)) as Buffer
  ).toString('hex');
  return hash === calculatedHash;
};
