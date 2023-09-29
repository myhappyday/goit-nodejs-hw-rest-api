import { Schema, model } from 'mongoose';
import Joi from 'joi';

import { handleSaveError, runValidateAtUpdate } from './hooks.js';

const phoneRegexp = /\(\d{3}\) \d{3}-\d{4}/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Set email for contact'],
    },
    phone: {
      type: String,
      match: [
        phoneRegexp,
        'Invalid phone format. The phone number should be in the format: (000) 000-0000.',
      ],
      required: [true, 'Set phone for contact'],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post('save', handleSaveError);

contactSchema.pre('findOneAndUpdate', runValidateAtUpdate);

contactSchema.post('findOneAndUpdate', handleSaveError);

export const contactAddSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'any.required': 'missing required name field',
  }),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required()
    .messages({
      'any.required': 'missing required email field',
    }),
  phone: Joi.string().min(6).max(20).pattern(phoneRegexp).required().messages({
    'any.required': 'missing required phone field',
    'string.pattern.base':
      'Invalid phone format. The phone number should be in the format: (000) 000-0000.',
  }),
  favorite: Joi.boolean(),
});

export const contactUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    'any.required': 'missing required favorite field',
  }),
});

const Contact = model('contact', contactSchema);

export default Contact;
