import { User } from '@prisma/client';
import { TCreateUserDTO } from '../types/DTOs/TCreateUserDTO';
import { TFindUserByEmail } from '../types/DTOs/TFindUserByEmail';
import { TFindUserById } from '../types/DTOs/TFindUserById';
import { TFindUserByUsername } from '../types/DTOs/TFindUserByUsername';
import { TSaveUserDTO } from '../types/DTOs/TSaveUserDTO';

export interface IUserRepository {
  create({ username, email, password, avatar }: TCreateUserDTO): Promise<User>;
  findById({ id }: TFindUserById): Promise<User>;
  findByEmail({ email }: TFindUserByEmail): Promise<User>;
  findByUsername({ username }: TFindUserByUsername): Promise<User>;
  save({ avatar, userId, username }: TSaveUserDTO): Promise<User>;
}
