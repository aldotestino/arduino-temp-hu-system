import Joi from 'joi';

const userSchema = Joi.object({
  name: Joi.string().allow(''),
  surname: Joi.string().allow(''),
  username: Joi.string().required().min(3).max(30),
  password: Joi.string().required().min(5)
});

export default userSchema;