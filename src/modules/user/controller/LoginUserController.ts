import { Request, Response } from 'express';
import { UserRepository } from '../repositories/UserRepository';
import { LoginUserUsecase } from '../usecases/LoginUserUsecase';

export class LoginUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const useCase = new LoginUserUsecase(new UserRepository());
    const { username, password } = request.body;
    const user = await useCase.execute({ username, password });

    return response.json(user);
  }
}
