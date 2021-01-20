const Joi = require('joi');
const User = require('../models/user.model');

module.exports = {

  // GET /v1/users
  listUsers: {
    query: Joi.object({
      page: Joi.number().min(1),
      perPage: Joi.number().min(1).max(100),
      keyword: Joi.string().optional().allow(''),
    }).options({ allowUnknown: true }),
  },

  // POST /v1/users
  createUser: {
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      name: Joi.string().max(128),
      role: Joi.string().valid(...User.roles),
    }).options({ allowUnknown: true }),
  },

  // PATCH /v1/users/:userId
  updateUser: {
    body: Joi.object({
      email: Joi.string().email(),
      password: Joi.string(),
      name: Joi.string().max(128),
      role: Joi.string().valid(...User.roles),
    }).options({ allowUnknown: true }),
    params: Joi.object({
      userId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
    }).options({ allowUnknown: true }),
  },
};
