import { AppError } from "../errors/AppError";
import { signAccessToken } from "../lib/jwt";
import {
  createUser,
  findUserByEmail,
  findUserByEmailWithPassword,
} from "../repository/user.repository";
import bcrypt from "bcryptjs";

export async function registerUser(
  email: string,
  password: string,
): Promise<void> {
  if (!email || !password) {
    throw new AppError(400, "Email and password are required!");
  }

  if (password.length < 6) {
    throw new AppError(400, "Password must be atleast 6 character long");
  }

  const normalizeEmail = email.toLowerCase().trim();

  const existingUser = await findUserByEmail(normalizeEmail);

  if (existingUser) {
    throw new AppError(409, "User already registered with this emaill");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await createUser(normalizeEmail, passwordHash);
}

export async function loginUser(
  email: string,
  password: string,
): Promise<{ accessToken: string }> {
  if (!email || !password) {
    throw new AppError(400, "Email and password are required!");
  }

  const normalizeEmail = email.toLowerCase().trim();

  const user = await findUserByEmailWithPassword(normalizeEmail);

  if (!user?.email || !user?.password_hash) {
    throw new AppError(401, "User not exist, please register first!");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password_hash);

  if (!isPasswordValid) {
    throw new AppError(401, "Invalid credential");
  }

  const accessToken = signAccessToken({
    userId: user.id,
    email: user.email,
    role: user.role,
  });

  return { accessToken };
}
