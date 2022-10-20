import { Router } from 'express';
import { isAuth } from '../../../shared/http/middlewares/isAuth';
import { CreateUserController } from '../controller/CreateUserController';
import { LoginUserController } from '../controller/LoginUserController';
import { ShowUserController } from '../controller/ShowUserController';
import { UpdateAvatarController } from '../controller/UpdateAvatarController';
import multer from 'multer';
import Uploadcondig from '../../../shared/config/upload';

const userRoutes = Router();

const createUserController = new CreateUserController();
const loginUserController = new LoginUserController();
const showUserController = new ShowUserController();

const updateUserAvatarController = new UpdateAvatarController();
const upload = multer(Uploadcondig);

userRoutes.post('/', createUserController.handle);
userRoutes.post('/login', loginUserController.handle);

userRoutes.use(isAuth);
userRoutes.get('/:userId', showUserController.handle);
userRoutes.patch(
  '/:userId/avatar',
  upload.single('avatar'),
  updateUserAvatarController.handle,
);

export { userRoutes };
