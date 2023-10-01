import express from 'express';

import authController from '../../controllers/auth-controller.js';

import * as userSchemas from '../../models/User.js';

import { validateBody } from '../../decorators/index.js';

const authRouter = express.Router();

const userSignupValidate = validateBody(userSchemas.userSignupSchema);
const userSigninValidate = validateBody(userSchemas.userSigninSchema);

authRouter.post('/register', userSignupValidate, authController.signup);

authRouter.post('/login', userSigninValidate, authController.signin);

export default authRouter;
