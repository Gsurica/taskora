import { AppError } from '../../../shared/errors/AppError';
import { IUserRepository } from '../interfaces/IUserRepository';
import { TLoginUserDTO } from '../types/DTOs/TLoginUserDTO';
import { sign } from 'jsonwebtoken';
import { TLoginResponse } from '../types/TLoginResponse';
import { compare } from 'bcryptjs';

export class LoginUserUsecase {
  constructor(private readonly userRepository: IUserRepository) {}
  async execute({
    username,
    password,
  }: TLoginUserDTO): Promise<TLoginResponse> {
    const user = await this.userRepository.findByUsername({ username });

    if (!user) {
      throw new AppError('User not exists!', 400);
    }

    const rightPassword = await compare(password, user.password);

    if (!rightPassword) {
      throw new AppError('Username or password doesnt match!', 400);
    }

    const token = sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRESIN,
    });

    return {
      user,
      token,
    };
  }
}
