import { Mission } from '@prisma/client';
import { IMissionRepository } from '../interfaces/IMIssionRepository';
import { TCreateMissionDTO } from '../types/DTOs/TCreateMissionDTO';
import { TDeleteMissionDTO } from '../types/DTOs/TDeleteMissionDTO';
import { TFindAllMissionDTO } from '../types/DTOs/TFindAllMissionDTO';
import { TShowOneDTO } from '../types/DTOs/TShowOneDTO';
import { TUpdateMissionDTO } from '../types/DTOs/TUpdateMissionDTO';
import { database } from '../../../shared/database';
import { expProvider } from '../../../shared/functions/expProvider';
import { TCompleteMIssionDTO } from '../types/DTOs/TCompleteMIssionDTO';
import { expUp } from '../../../shared/functions/expUp';
import { levelUp } from '../../../shared/functions/levelUp';
import { TFindUserById } from 'src/modules/user/types/DTOs/TFindUserById';

export class MissionRepository implements IMissionRepository {
  async create({
    userId,
    title,
    description,
    userLevel,
  }: TCreateMissionDTO): Promise<Mission> {
    const mission = await database.mission.create({
      data: {
        title,
        description,
        User: {
          connect: {
            id: userId,
          },
        },
        expProvider: expProvider(userLevel),
      },
    });
    return mission;
  }
  async update({
    title,
    description,
    missionId,
  }: TUpdateMissionDTO): Promise<Mission> {
    const mission = await database.mission.update({
      where: {
        id: missionId,
      },
      data: {
        title,
        description,
      },
    });

    return mission;
  }
  async delete({ missionId }: TDeleteMissionDTO): Promise<void> {
    await database.mission.delete({
      where: {
        id: missionId,
      },
    });
  }

  async findAll({ userId }: TFindAllMissionDTO): Promise<Mission[]> {
    const missions = await database.mission.findMany({
      where: {
        userId,
      },
    });

    return missions;
  }

  async showOne({ missionId }: TShowOneDTO): Promise<Mission> {
    const mission = await database.mission.findUnique({
      where: {
        id: missionId,
      },
    });

    return mission;
  }

  async complete({
    userLevel,
    userExp,
    missionId,
    isComplete,
  }: TCompleteMIssionDTO): Promise<Mission> {
    const missionCompleted = await database.mission.update({
      where: {
        id: missionId,
      },
      data: {
        isComplete: isComplete,
        User: {
          update: {
            exp: expUp(userExp, expProvider(userLevel)),
            level: levelUp(userLevel, userExp),
          },
        },
      },
    });

    return missionCompleted;
  }
}
