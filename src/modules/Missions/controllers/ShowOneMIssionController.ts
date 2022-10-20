import { Request, Response } from 'express';
import { UserRepository } from '../../../modules/user/repositories/UserRepository';
import { MissionRepository } from '../repositories/MIssionRepository';
import { ShowOneMissionUsecase } from '../usecases/ShowOneMIssionUsecase';

export class ShowOneMissionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const useCase = new ShowOneMissionUsecase(
      new MissionRepository(),
      new UserRepository(),
    );
    const { missionId, userId } = request.params;
    const mission = await useCase.execute({ missionId, userId });

    return response.json(mission);
  }
}
