import { Request, Response } from 'express';
import { MissionRepository } from '../repositories/MIssionRepository';
import { ShowAllMissionsUsecase } from '../usecases/ShowAllMissionsUsecase';

export class ShowAllMissionsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const useCase = new ShowAllMissionsUsecase(new MissionRepository());

    const { userId } = request.params;

    const missions = await useCase.execute({ userId });

    return response.json(missions);
  }
}
