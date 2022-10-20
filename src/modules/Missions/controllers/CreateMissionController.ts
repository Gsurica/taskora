import { Request, Response } from 'express';
import { UserRepository } from '../../../modules/user/repositories/UserRepository';
import { MissionRepository } from '../repositories/MIssionRepository';
import { CreateMissionUsecase } from '../usecases/CreateMIssionUsecase';

export class CreateMissinController {
  async handle(request: Request, response: Response): Promise<Response> {
    const useCase = await new CreateMissionUsecase(
      new MissionRepository(),
      new UserRepository(),
    );

    const { userId, userLevel } = request.params;
    const { title, description } = request.body;

    const mission = await useCase.execute({
      title,
      description,
      userId,
      userLevel,
    });

    return response.status(201).json(mission);
  }
}
