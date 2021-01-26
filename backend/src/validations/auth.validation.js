const Joi = require("joi");

module.exports = {
  register: {
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  },
  login: {
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  },
  forgotpassword: {
    body: Joi.object({
      email: Joi.string().email().required(),
    }),
  },
  resetpassword: {
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().required().min(6).max(128),
      resetToken: Joi.string().required(),
    },
  },
  refresh: {
    body: Joi.object({
      email: Joi.string().email().required(),
      refreshToken: Joi.string().required(),
    }),
  },
};
