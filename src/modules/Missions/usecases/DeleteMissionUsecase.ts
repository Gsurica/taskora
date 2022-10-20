import { IUserRepository } from '../../../modules/user/interfaces/IUserRepository';
import { AppError } from '../../../shared/errors/AppError';
import { IMissionRepository } from '../interfaces/IMIssionRepository';
import { TDeleteMissionDTO } from '../types/DTOs/TDeleteMissionDTO';

export class DeleteMissionUsecase {
  constructor(
    private readonly missionRepository: IMissionRepository,
    private readonly userRepository: IUserRepository,
  ) {}
  async execute({ missionId, userId }: TDeleteMissionDTO) {
    const user = await this.userRepository.findById({
      id: userId,
    });

    if (!user) {
      throw new AppError('User not exists!');
    }

    const mission = await this.missionRepository.delete({ missionId, userId });
    return mission;
  }
}
