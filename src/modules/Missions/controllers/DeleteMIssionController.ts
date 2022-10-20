import { Request, Response } from 'express';
import { UserRepository } from '../../../modules/user/repositories/UserRepository';
import { MissionRepository } from '../repositories/MIssionRepository';
import { DeleteMissionUsecase } from '../usecases/DeleteMissionUsecase';

export class DeleteMissionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const useCase = new DeleteMissionUsecase(
      new MissionRepository(),
      new UserRepository(),
    );
    const { missionId, userId } = request.params;
    await useCase.execute({ missionId, userId });
    return response.status(204).json({ message: 'Mission deleted!' });
  }
}
