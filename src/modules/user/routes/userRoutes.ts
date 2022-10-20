import { Router } from 'express';
import { isAuth } from '../../../shared/http/middlewares/isAuth';
import { CreateUserController } from '../controller/CreateUserController';
import { LoginUserController } from '../controller/LoginUserController';
import { ShowUserController } from '../controller/ShowUserController';

const userRoutes = Router();

const createUserController = new CreateUserController();
const loginUserController = new LoginUserController();
const showUserController = new ShowUserController();

userRoutes.post('/', createUserController.handle);
userRoutes.post('/login', loginUserController.handle);

userRoutes.use(isAuth);
userRoutes.get('/:userId', showUserController.handle);

export { userRoutes };
