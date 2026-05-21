import jwt from "jsonwebtoken";

const expiresAccess = "15m";
const expiresRefresh = "7d";



export interface ITokenPayload {
  userId: string;
  email: string;
}

// Функции для получения секретов (ленивая загрузка)
function getAccessSecret(): string {
  const secret = process.env.JWT_ACCESS_SECRET;
  if (!secret) {
    throw new Error('JWT_ACCESS_SECRET is not defined in .env.local');
  }
  return secret;
}

function getRefreshSecret(): string {
  const secret = process.env.JWT_REFRESH_SECRET;
  if (!secret) {
    throw new Error('JWT_REFRESH_SECRET is not defined in .env.local');
  }
  return secret;
}


export function generateAccessToken(payload: ITokenPayload): string {
  return jwt.sign(payload, getAccessSecret(), { expiresIn: expiresAccess });
}

export function generateRefreshToken(payload: ITokenPayload): string {
  return jwt.sign(payload, getRefreshSecret(), { expiresIn: expiresRefresh });
}

export function verifyAccessToken(token: string): ITokenPayload | null {
  try {
    return jwt.verify(token, getAccessSecret()) as ITokenPayload;
  } catch {
    return null;
  }
}

export function verifyRefreshToken(token: string): ITokenPayload | null {
  try {
    return jwt.verify(token, getRefreshSecret()) as ITokenPayload;
  } catch {
    return null;
  }
}
