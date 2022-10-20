import { Request, Response } from 'express';
import { UserRepository } from '../../user/repositories/UserRepository';
import { MissionRepository } from '../repositories/MIssionRepository';
import { UpdateMissionUsecase } from '../usecases/UpdateMissionUsecase';

export class UpdateMissionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const useCase = new UpdateMissionUsecase(
      new MissionRepository(),
      new UserRepository(),
    );

    const { userId, missionId } = request.params;
    const { title, description } = request.body;

    const mission = await useCase.execute({
      userId,
      missionId,
      title,
      description,
    });

    return response.json(mission);
  }
}
