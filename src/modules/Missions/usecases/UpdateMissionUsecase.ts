import { Mission } from '@prisma/client';
import { IUserRepository } from '../../user/interfaces/IUserRepository';
import { IMissionRepository } from '../interfaces/IMIssionRepository';
import { TUpdateMissionDTO } from '../types/DTOs/TUpdateMissionDTO';
import { AppError } from '../../../shared/errors/AppError';

export class UpdateMissionUsecase {
  constructor(
    private readonly missionRepository: IMissionRepository,
    private readonly userRepository: IUserRepository,
  ) {}
  async execute({
    title,
    missionId,
    description,
    userId,
  }: TUpdateMissionDTO): Promise<Mission> {
    const user = await this.userRepository.findById({ id: userId });

    if (!user) {
      throw new AppError('User not logged!', 500);
    }

    const mission = await this.missionRepository.update({
      title,
      description,
      userId,
      missionId,
    });

    return mission;
  }
}
