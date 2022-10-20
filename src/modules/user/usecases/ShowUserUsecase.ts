import { User } from '@prisma/client';
import { AppError } from '../../../shared/errors/AppError';
import { IUserRepository } from '../interfaces/IUserRepository';
import { TFindUserById } from '../types/DTOs/TFindUserById';

export class ShowUserUsecase {
  constructor(private readonly userRepository: IUserRepository) {}
  async execute({ id }: TFindUserById): Promise<User> {
    const user = await this.userRepository.findById({ id });

    if (!user) {
      throw new AppError('User not exists or not logged!');
    }

    return user;
  }
}
