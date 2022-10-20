import { Mission } from '@prisma/client';
import { IUserRepository } from '../../user/interfaces/IUserRepository';
import { IMissionRepository } from '../interfaces/IMIssionRepository';
import { TCompleteMIssionDTO } from '../types/DTOs/TCompleteMIssionDTO';
import { AppError } from '../../../shared/errors/AppError';

export class CompleteMissionUsecase {
  constructor(
    private readonly missionRepository: IMissionRepository,
    private readonly userRepository: IUserRepository,
  ) {}
  async execute({
    userId,
    missionId,
    userExp,
    userLevel,
    isComplete,
  }: TCompleteMIssionDTO): Promise<Mission> {
    const user = await this.userRepository.findById({ id: userId });

    if (!user) {
      throw new AppError('User not logged!');
    }

    const mission = await this.missionRepository.complete({
      missionId,
      userExp,
      userLevel,
      userId,
      isComplete,
    });

    return mission;
  }
}
