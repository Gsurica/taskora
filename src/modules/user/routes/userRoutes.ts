import { Router } from 'express';
import { CreateUserController } from '../controller/CreateUserController';
import { LoginUserController } from '../controller/LoginUserController';

const userRoutes = Router();

const createUserController = new CreateUserController();
const loginUserController = new LoginUserController();

userRoutes.post('/', createUserController.handle);
userRoutes.post('/login', loginUserController.handle);

export { userRoutes };
