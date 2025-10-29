import bcrypt from "bcrypt";
import prisma from "../lib/prisma";
import { generateTokens } from "../utils/generateToken";

interface RegisterInput {
  username: string;
  email: string;
  password: string;
}

export const registerUser = async (input: RegisterInput, res: any) => {
  const { username, email, password } = input;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    const error = new Error("Пользователь с таким email уже существует") as any;
    error.status = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
      role: "USER",
    },
  });

  const tokens = generateTokens({ id: user.id });

  await prisma.refreshToken.create({
    data: {
      token: tokens.refreshToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 дней
    },
  });

  res.cookie("refreshToken", tokens.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  return {
    user: { id: user.id, username: user.username, email: user.email },
    accessToken: tokens.accessToken,
  };
};

export const loginUser = async (
  input: Omit<RegisterInput, "username">,
  res: any
) => {
  const { email, password } = input;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    const error = new Error("Неверный email или пароль") as any;
    error.status = 400;
    throw error;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    const error = new Error("Неверный email или пароль") as any;
    error.status = 400;
    throw error;
  }

  const tokens = generateTokens({ id: user.id });

  await prisma.refreshToken.create({
    data: {
      token: tokens.refreshToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  });

  res.cookie("refreshToken", tokens.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  return {
    user: { id: user.id, username: user.username, email: user.email },
    accessToken: tokens.accessToken,
  };
};

export const refreshTokens = async (refreshToken: string, res: any) => {
  const tokenRecord = await prisma.refreshToken.findUnique({
    where: { token: refreshToken },
    include: { user: true },
  });

  if (!tokenRecord) {
    const error = new Error("Неверный токен") as any;
    error.status = 403;
    throw error;
  }

  if (tokenRecord.revokedAt) {
    const error = new Error("Токен был отозван") as any;
    error.status = 403;
    throw error;
  }

  if (new Date() > tokenRecord.expiresAt) {
    const error = new Error("Токен истек") as any;
    error.status = 403;
    throw error;
  }

  const tokens = generateTokens({ id: tokenRecord.userId });

  await prisma.refreshToken.update({
    where: { token: refreshToken },
    data: {
      token: tokens.refreshToken,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  });

  res.cookie("refreshToken", tokens.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  return {
    user: {
      id: tokenRecord.user.id,
      username: tokenRecord.user.username,
      email: tokenRecord.user.email,
    },
    accessToken: tokens.accessToken,
  };
};

export const logoutUser = async (refreshToken: string) => {
  await prisma.refreshToken.update({
    where: { token: refreshToken },
    data: { revokedAt: new Date() },
  });
};
