import { Router } from 'express';
import { missionRoutes } from '../../../modules/Missions/routes/misisonRoutes';
import { userRoutes } from '../../../modules/user/routes/userRoutes';

const routes = Router();

routes.use('/user', userRoutes);
routes.use('/mission', missionRoutes);

routes.get('/', (request, response) => {
  return response.json({ message: 'Olá, Dev!' });
});

export { routes };
