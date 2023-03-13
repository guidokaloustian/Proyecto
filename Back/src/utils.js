import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt'

export const __dirname = dirname(fileURLToPath(import.meta.url));

export const hashPass = async (password)=> {
    return bcrypt.hash(password, 10)
}

export const comparePasswords = async (password, hashedPass)=> {
    return bcrypt.compare(password, hashedPass)
}