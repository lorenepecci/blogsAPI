const Joi = require('joi');

const users = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  password: Joi.string().min(6).required(),
  image: Joi.string().required(),
});

const categories = Joi.object({
  name: Joi.string().required(),
});

const posts = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.required(),
});

const postUpdate = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});

const validUser = (req, _res, next) => {
  console.log('valid');
  const { error } = users.validate(req.body);
  if (error) {
    const { type, message } = error.details[0];
    const statusCode = {
      'any.required': 400,
      'string.min': 400,
      'string.email': 400,
    };
    const erro = { status: statusCode[type], message };
    throw erro;
  }
  return next();
};

const validCategories = (req, _res, next) => {
  console.log('valid');
  const { error } = categories.validate(req.body);
  if (error) {
    const { type, message } = error.details[0];
    const statusCode = {
      'any.required': 400,
    };
    const erro = { status: statusCode[type], message };
    throw erro;
  }
  return next();
};

const validPost = (req, res, next) => {
  console.log('valid');
  const { error } = posts.validate(req.body);
  if (error) {
    /* const { type } = error.details[0];
    const statusCode = {
      'any.required': 400,
    }; */
   /*  const erro = { status: statusCode[type], message: 'Some required fields are missing' };
    throw erro; */
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  return next();
};

const validUpdate = (req, res, next) => {
  console.log('valid');
  const { error } = postUpdate.validate(req.body);
  if (error) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  next();
};

module.exports = { validUser, validCategories, validPost, validUpdate };