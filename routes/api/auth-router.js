import express from 'express';

import authController from '../../controllers/auth-controller.js';

import * as userSchemas from '../../models/User.js';

import { validateBody } from '../../decorators/index.js';

import { authenticate, upload } from '../../middlewares/index.js';

const authRouter = express.Router();

const userRegisterValidate = validateBody(userSchemas.userRegisterSchema);
const userLoginValidate = validateBody(userSchemas.userLoginSchema);
const subscriptionValidate = validateBody(userSchemas.subscriptionSchema);

authRouter.post('/register', userRegisterValidate, authController.register);

authRouter.post('/login', userLoginValidate, authController.login);

authRouter.get('/current', authenticate, authController.getCurrent);

authRouter.patch(
  '/',
  authenticate,
  subscriptionValidate,
  authController.updateSubscription
);

authRouter.post('/logout', authenticate, authController.logout);

export default authRouter;
