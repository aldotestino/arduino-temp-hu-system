import Joi from 'joi';

const userSchema = Joi.object({
  name: Joi.string(),
  surname: Joi.string(),
  username: Joi.string().required().min(3).max(30),
  password: Joi.string().required().min(5)
});

export default userSchema;