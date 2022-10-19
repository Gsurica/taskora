import { User } from '@prisma/client';

export type TLoginResponse = {
  token: string;
  user: User;
};
