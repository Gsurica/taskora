import path from 'node:path';
import { IUserRepository } from '../interfaces/IUserRepository';
import { TUpdateAvatarDTO } from '../types/DTOs/TUpdateAvatarDTO';
import { AppError } from '../../../shared/errors/AppError';
import uploadConfig from '../../../shared/config/upload';
import fs from 'node:fs';

export class UploadUserAvatarUsecase {
  constructor(private readonly userRepository: IUserRepository) {}
  async execute({ avatarFileName, userid }: TUpdateAvatarDTO) {
    const user = await this.userRepository.findById({ id: userid });

    if (!user) {
      throw new AppError(
        'Only autheticated users could change avatar image!',
        401,
      );
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    const avatar = (user.avatar = avatarFileName);

    await this.userRepository.save({
      avatar,
      userId: user.id,
      username: user.username,
    });
  }
}
