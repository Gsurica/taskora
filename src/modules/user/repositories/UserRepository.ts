import { IUserRepository } from '../interfaces/IUserRepository';
import { database } from '../../../shared/database';
import { User } from '@prisma/client';
import { TCreateUserDTO } from '../types/DTOs/TCreateUserDTO';
import { TFindUserByEmail } from '../types/DTOs/TFindUserByEmail';
import { TFindUserById } from '../types/DTOs/TFindUserById';
import { TFindUserByUsername } from '../types/DTOs/TFindUserByUsername';
import { TSaveUserDTO } from '../types/DTOs/TSaveUserDTO';

export class UserRepository implements IUserRepository {
  async findById({ id }: TFindUserById): Promise<User> {
    const user = await database.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        username: true,
        email: true,
        avatar: true,
        exp: true,
        level: true,
        missions: {
          select: {
            id: true,
            title: true,
            description: true,
            isComplete: true,
          },
        },
        password: true,
      },
    });
    return user;
  }

  async findByEmail({ email }: TFindUserByEmail): Promise<User> {
    const user = await database.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }

  async findByUsername({ username }: TFindUserByUsername): Promise<User> {
    const user = await database.user.findUnique({
      where: {
        username,
      },
    });
    return user;
  }

  async create({
    username,
    email,
    password,
    avatar,
  }: TCreateUserDTO): Promise<User> {
    const user = await database.user.create({
      data: {
        username,
        email,
        password,
        avatar,
        exp: 0,
        level: 1,
      },
    });
    return user;
  }

  async save({ userId, username, avatar }: TSaveUserDTO): Promise<User> {
    return database.user.update({
      where: {
        id: userId,
      },
      data: {
        username,
        avatar,
      },
    });
  }
}
