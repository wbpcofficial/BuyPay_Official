const httpStatus = require("http-status");
const { omit } = require("lodash");
const User = require("../models/user.model");
const Role = require("../utils/role");
const Timezone = require("../models/tokenlist.model");
const APIError = require("../utils/APIError");

exports.load = async (req, res, next, id) => {
  try {
    const user = await User.get(id);
    req.locals = { user };

    return next();
  } catch (error) {
    return next(error);
  }
};

exports.get = (req, res) => res.json(req.locals.user.transform());

exports.loggedIn = (req, res) => res.json(req.user.transform());

exports.create = async (req, res, next) => {
  try {
    const ommitRole = req.user.role !== Role.ADMIN ? "role" : "";
    const updatedUserData = omit(req.body, ommitRole);
    const user = new User(updatedUserData);
    const savedUser = await user.save();
    res.status(httpStatus.CREATED);
    res.json(savedUser.transform());
  } catch (error) {
    next(User.checkDuplicateEmail(error));
  }
};

exports.update = (req, res, next) => {
  const ommitRole = req.user.role !== Role.ADMIN ? "role" : "";
  const updatedUserData = omit(req.body, ommitRole);
  const user = Object.assign(req.locals.user, updatedUserData);

  user
    .save()
    .then((savedUser) => res.json(savedUser.transform()))
    .catch((e) => next(User.checkDuplicateEmail(e)));
};

exports.list = async (req, res, next) => {
  try {
    let users = await User.list(req.query);

    res.json(users);
  } catch (error) {
    next(error);
  }
};

exports.remove = async (req, res, next) => {
  const { user } = req.locals;
  if (req.user._id.equals(user._id)) {
    let error = new APIError({
      message: "The user has can't delete his own account.",
      status: httpStatus.FORBIDDEN,
    });
    return next(error);
  }
  try {
    await Timezone.deleteMany({ user: user._id });
    await user.remove();
    res.status(httpStatus.NO_CONTENT).end();
  } catch (error) {
    next(error);
  }
};
