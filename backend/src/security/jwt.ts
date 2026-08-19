import jwt, { SignOptions } from 'jsonwebtoken';

export interface TokenPayload {
  id: number;
  email: string;
}

const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined in the environment variables");
  }
  return secret;
};

export const generateToken = (payload: TokenPayload): string => {
  const secret = getJwtSecret();
  const expiresIn = (process.env.JWT_EXPIRES_IN || '1h') as SignOptions['expiresIn'];

  return jwt.sign(payload, secret, { expiresIn });
};

export const verifyToken = (token: string): TokenPayload => {
  const secret = getJwtSecret();
  return jwt.verify(token, secret) as TokenPayload;
};
