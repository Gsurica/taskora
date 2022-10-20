import { Request, Response } from 'express';
import { UserRepository } from '../../user/repositories/UserRepository';
import { MissionRepository } from '../repositories/MIssionRepository';
import { CompleteMissionUsecase } from '../usecases/CompleteMissionUsecase';

export class CompleteMissionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const useCase = new CompleteMissionUsecase(
      new MissionRepository(),
      new UserRepository(),
    );

    const { userId, userLevel, userExp, missionId } = request.params;
    const { isComplete } = request.body;

    const convertedExp = Number(userExp);
    const convertedLevel = Number(userLevel);

    const missionCompleted = await useCase.execute({
      userExp: convertedExp,
      userLevel: convertedLevel,
      userId,
      missionId,
      isComplete,
    });

    return response.json(missionCompleted);
  }
}
