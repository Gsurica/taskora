import { Request, Response } from 'express';
import { UserRepository } from '../repositories/UserRepository';
import { UploadUserAvatarUsecase } from '../usecases/UploadUserAvatarUsecase';

export class UpdateAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const userCase = new UploadUserAvatarUsecase(new UserRepository());
    const { userId } = request.params;
    const user = await userCase.execute({
      userId,
      avatarFileName: request.file.filename,
    });

    return response.json(user);
  }
}
