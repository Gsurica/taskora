import { User } from '@prisma/client';
import { AppError } from '../../../shared/errors/AppError';
import { IUserRepository } from '../interfaces/IUserRepository';
import { TCreateUserDTO } from '../types/DTOs/TCreateUserDTO';
import { hash } from 'bcryptjs';

export class CreateUserUsecase {
  constructor(private readonly userRepository: IUserRepository) {}
  async execute({
    username,
    email,
    password,
    avatar,
  }: TCreateUserDTO): Promise<User> {
    const usernameAlreadyInUse = await this.userRepository.findByUsername({
      username,
    });

    if (usernameAlreadyInUse) {
      throw new AppError('Username already in use!', 400);
    }

    const emailAlreadyInUse = await this.userRepository.findByEmail({ email });

    if (emailAlreadyInUse) {
      throw new AppError('Email already in use!', 400);
    }

    const hashedPassword = await hash(password, 10);

    const user = await this.userRepository.create({
      username,
      email,
      password: hashedPassword,
      avatar,
    });

    return user;
  }
}
