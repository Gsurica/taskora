import { Mission } from '@prisma/client';
import { IMissionRepository } from '../interfaces/IMIssionRepository';
import { TFindAllMissionDTO } from '../types/DTOs/TFindAllMissionDTO';

export class ShowAllMissionsUsecase {
  constructor(private readonly missionRepository: IMissionRepository) {}

  async execute({ userId }: TFindAllMissionDTO): Promise<Mission[]> {
    const missions = await this.missionRepository.findAll({ userId });
    return missions;
  }
}
