import { Request, Response } from 'express';
import { UserRepository } from '../repositories/UserRepository';
import { ShowUserUsecase } from '../usecases/ShowUserUsecase';

export class ShowUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const useCase = new ShowUserUsecase(new UserRepository());
    const { userId } = request.params;
    const user = await useCase.execute({ id: userId });
    return response.json(user);
  }
}
