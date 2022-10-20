import { Router } from 'express';
import { isAuth } from '../../../shared/http/middlewares/isAuth';
import { CreateMissinController } from '../controllers/CreateMissionController';
import { DeleteMissionController } from '../controllers/DeleteMIssionController';
import { ShowOneMissionController } from '../controllers/ShowOneMIssionController';
import { UpdateMissionController } from '../controllers/UpdateMissionController';
import { ShowAllMissionsController } from '../controllers/ShowAllMissionsController';
import { CompleteMissionController } from '../controllers/CompleteMissionController';

const missionRoutes = Router();

const createMissionController = new CreateMissinController();
const deleteMissionController = new DeleteMissionController();
const showOneMissionController = new ShowOneMissionController();
const updateMissionController = new UpdateMissionController();
const showAllMissionsController = new ShowAllMissionsController();
const completeMissionController = new CompleteMissionController();

missionRoutes.use(isAuth);
missionRoutes.post(
  '/:userId/:userLevel/:userExp',
  createMissionController.handle,
);
missionRoutes.put(
  '/complete/:userId/:missionId/:userExp/:userLevel',
  completeMissionController.handle,
);
missionRoutes.get('/all_missions/:userId', showAllMissionsController.handle);
missionRoutes.delete('/:userId/:missionId', deleteMissionController.handle);
missionRoutes.get('/:userId/:missionId', showOneMissionController.handle);
missionRoutes.put('/:userId/:missionId', updateMissionController.handle);

export { missionRoutes };
