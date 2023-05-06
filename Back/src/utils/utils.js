import { dirname } from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const __dirname = dirname(fileURLToPath(import.meta.url));

export const hashData = async (password) => {
  return bcrypt.hash(password, 10);
};

export const comparePasswords = async (password, hashedPass) => {
  return bcrypt.compare(password, hashedPass);
};

export const generateToken = (user) => {
  const token = jwt.sign({ user }, "secretKey", { expiresIn: "1h" });
  return token;
};
