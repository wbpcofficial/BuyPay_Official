const httpStatus = require("http-status");
const Timezone = require("../models/timezone.model");
const { ADMIN } = require("../utils/role");

exports.load = async (req, res, next, id) => {
  try {
    const timezone = await Timezone.get(id);
    req.locals = { timezone, permittedUserId: timezone.user._id };
    return next();
  } catch (error) {
    return next(error);
  }
};

exports.get = (req, res) => res.json(req.locals.timezone.transform());

exports.create = async (req, res, next) => {
  try {
    const timezone = new Timezone(req.body);
    timezone.user = req.user;
    const savedTimezone = await timezone.save();
    res.status(httpStatus.CREATED);
    res.json(savedTimezone.transform());
  } catch (error) {
    next(error);
  }
};

exports.update = (req, res, next) => {
  const timezoneData = req.body;
  const timezone = Object.assign(req.locals.timezone, timezoneData);

  timezone
    .save()
    .then((savedTimezone) => res.json(savedTimezone.transform()))
    .catch((e) => next(e));
};

exports.list = async (req, res, next) => {
  try {
    const query = { ...req.query };
    if (req.user.role != ADMIN) {
      query["userId"] = req.user._id;
    }
    let timezones = await Timezone.list(query);
    res.json(timezones);
  } catch (error) {
    next(error);
  }
};

exports.remove = (req, res, next) => {
  const { timezone } = req.locals;

  timezone
    .remove()
    .then(() => res.status(httpStatus.NO_CONTENT).end())
    .catch((e) => next(e));
};
