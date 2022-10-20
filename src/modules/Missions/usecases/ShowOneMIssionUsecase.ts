import { Mission } from '@prisma/client';
import { IUserRepository } from '../../../modules/user/interfaces/IUserRepository';
import { IMissionRepository } from '../interfaces/IMIssionRepository';
import { TShowOneDTO } from '../types/DTOs/TShowOneDTO';
import { AppError } from '../../../shared/errors/AppError';

export class ShowOneMissionUsecase {
  constructor(
    private readonly missionRepository: IMissionRepository,
    private readonly userRepository: IUserRepository,
  ) {}
  async execute({ userId, missionId }: TShowOneDTO): Promise<Mission> {
    const user = await this.userRepository.findById({ id: userId });

    if (!user) {
      throw new AppError('User not exists! or failed', 400);
    }

    const mission = await this.missionRepository.showOne({ missionId, userId });

    return mission;
  }
}
