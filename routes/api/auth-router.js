import express from 'express';

import authController from '../../controllers/auth-controller.js';

import * as userSchemas from '../../models/User.js';

import { validateBody } from '../../decorators/index.js';

const authRouter = express.Router();

const userSignupValidate = validateBody(userSchemas.userSignupSchema);

authRouter.post('/signup', userSignupValidate, authController.signup);

export default authRouter;
