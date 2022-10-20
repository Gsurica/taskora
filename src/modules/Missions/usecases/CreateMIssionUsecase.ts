import { Mission } from '@prisma/client';
import { IUserRepository } from '../../user/interfaces/IUserRepository';
import { AppError } from '../../../shared/errors/AppError';
import { IMissionRepository } from '../interfaces/IMIssionRepository';
import { TCreateMissionDTO } from '../types/DTOs/TCreateMissionDTO';

export class CreateMissionUsecase {
  constructor(
    private readonly missionRepository: IMissionRepository,
    private readonly userRepository: IUserRepository,
  ) {}
  async execute({
    title,
    description,
    userId,
    userLevel,
  }: TCreateMissionDTO): Promise<Mission> {
    const user = await this.userRepository.findById({ id: userId });

    if (!user) {
      throw new AppError('User not logged!', 400);
    }

    const mission = await this.missionRepository.create({
      title,
      description,
      userId,
      userLevel,
    });

    return mission;
  }
}
