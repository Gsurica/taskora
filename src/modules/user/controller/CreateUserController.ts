import { Request, Response } from 'express';
import { UserRepository } from '../repositories/UserRepository';
import { CreateUserUsecase } from '../usecases/CreateUserUsecase';

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const userCase = new CreateUserUsecase(new UserRepository());
    const { username, email, password, avatar } = request.body;
    const user = await userCase.execute({
      username,
      email,
      password,
      avatar,
    });

    return response.status(201).json(user);
  }
}
