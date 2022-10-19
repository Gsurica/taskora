import { Router } from 'express';
import { userRoutes } from '../../../modules/user/routes/userRoutes';

const routes = Router();

routes.use('/user', userRoutes);

routes.get('/', (request, response) => {
  return response.json({ message: 'Olá, Dev!' });
});

export { routes };
