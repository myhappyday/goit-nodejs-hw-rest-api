import { HttpError } from '../helpers/index.js';

const validateFavoriteStatus = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(HttpError(400, 'Missing field favorite'));
  }

  next();
};

export default validateFavoriteStatus;
