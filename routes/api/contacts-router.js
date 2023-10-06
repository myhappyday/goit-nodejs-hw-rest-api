import express from 'express';

import contactsController from '../../controllers/contacts-controller.js';

import * as contactSchemas from '../../models/Contact.js';

import { validateBody } from '../../decorators/index.js';

import {
  authenticate,
  upload,
  isValidId,
  validateFavoriteStatus,
} from '../../middlewares/index.js';

const contactAddValidate = validateBody(contactSchemas.contactAddSchema);
const contactUpdateFavoriteValidate = validateBody(
  contactSchemas.contactUpdateFavoriteSchema
);

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get('/', contactsController.getListContacts);

contactsRouter.get('/:id', isValidId, contactsController.getContactById);

contactsRouter.post(
  '/',
  // upload.single('avatar'),
  contactAddValidate,
  contactsController.addContact
);

contactsRouter.delete('/:id', isValidId, contactsController.removeContact);

contactsRouter.put(
  '/:id',
  isValidId,
  contactAddValidate,
  contactsController.updateContact
);

contactsRouter.patch(
  '/:id/favorite',
  isValidId,
  validateFavoriteStatus,
  contactUpdateFavoriteValidate,
  contactsController.updateStatusContact
);

export default contactsRouter;
