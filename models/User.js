import { Schema, model } from 'mongoose';
import Joi from 'joi';

import { handleSaveError, runValidateAtUpdate } from './hooks.js';

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const subscriptionList = ['starter', 'pro', 'business'];

const userSchema = new Schema(
  {
    email: {
      type: String,
      match: [emailRegexp, 'Invalid email format'],
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      minlength: [6, 'Password must be at least 6 characters long'],
      required: [true, 'Set password for user'],
    },
    subscription: {
      type: String,
      enum: subscriptionList,
      default: 'starter',
    },
    token: {
      type: String,
      default: '',
    },
    avatarURL: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('save', handleSaveError);

userSchema.pre('findOneAndUpdate', runValidateAtUpdate);

userSchema.post('findOneAndUpdate', handleSaveError);

export const userRegisterSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    'any.required': 'Missing required email field',
    'string.pattern.base': 'Invalid email format',
  }),
  password: Joi.string().min(6).required().messages({
    'any.required': 'Missing required password field',
    'string.min': 'Password must be at least {#limit} characters long',
  }),
  subscription: Joi.string().valid(...subscriptionList),
});

export const userLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    'any.required': 'Missing required email field',
    'string.pattern.base': 'Invalid email format',
  }),
  password: Joi.string().min(6).required().messages({
    'any.required': 'Missing required password field',
    'string.min': 'Password must be at least {#limit} characters long',
  }),
});

export const subscriptionSchema = Joi.object({
  subscription: Joi.string().valid(...subscriptionList),
});

export const userEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    'any.required': 'Missing required field email',
    'string.pattern.base': 'Invalid email format',
  }),
});

const User = model('user', userSchema);

export default User;
