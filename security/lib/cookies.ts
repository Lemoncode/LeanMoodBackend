import { Response } from 'express';

export const generateCookie = (res: Response, name: string, value) => {
  if (res.cookie) {
    res.cookie(name, value, {
      httpOnly: true,
      secure: true,
    });
  }
};
