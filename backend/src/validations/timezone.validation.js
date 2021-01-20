const Joi = require('joi');

module.exports = {

  // GET /v1/timezones
  listTimezones: {
    query: Joi.object({
      page: Joi.number().min(1),
      perPage: Joi.number().min(1).max(100),
      keyword: Joi.string().optional().allow(''),
    }).options({ allowUnknown: true }),
  },

  // POST /v1/timezones
  createTimezone: {
    body: Joi.object({
      name: Joi.string().required(),
      city: Joi.string().required(),
      timeDiff: Joi.number().min(-12).max(12).required(),
    }).options({ allowUnknown: true }),
  },

  // PATCH /v1/timezones/:timezoneId
  updateTimezone: {
    body: Joi.object({
      name: Joi.string(),
      city: Joi.string(),
      timeDiff: Joi.number().min(-12).max(12),
    }).options({ allowUnknown: true }),
    params: Joi.object({
      timezoneId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
    }),
  },
};
