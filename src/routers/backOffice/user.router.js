import { Router } from 'express';

import * as userController from '../../controllers/backOffice/user.controller.js';

export const router = Router();

router.get('/users', userController.getAllUsers);

// router.post('/users', userController.createUser);
//(besoin de moins de vérification)
// router.get('/users', userController.getAllUsers);
