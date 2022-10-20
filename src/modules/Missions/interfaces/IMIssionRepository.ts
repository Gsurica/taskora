import { Mission } from '@prisma/client';
import { TCompleteMIssionDTO } from '../types/DTOs/TCompleteMIssionDTO';
import { TCreateMissionDTO } from '../types/DTOs/TCreateMissionDTO';
import { TDeleteMissionDTO } from '../types/DTOs/TDeleteMissionDTO';
import { TFindAllMissionDTO } from '../types/DTOs/TFindAllMissionDTO';
import { TShowOneDTO } from '../types/DTOs/TShowOneDTO';
import { TUpdateMissionDTO } from '../types/DTOs/TUpdateMissionDTO';

export interface IMissionRepository {
  create({ userId, title, description }: TCreateMissionDTO): Promise<Mission>;
  update({ title, description }: TUpdateMissionDTO): Promise<Mission>;
  delete({ userId, missionId }: TDeleteMissionDTO): Promise<void>;
  findAll({ userId }: TFindAllMissionDTO): Promise<Mission[]>;
  showOne({ userId, missionId }: TShowOneDTO): Promise<Mission>;
  complete({ userLevel, userExp }: TCompleteMIssionDTO): Promise<Mission>;
}
