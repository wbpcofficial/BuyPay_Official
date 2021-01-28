const httpStatus = require("http-status");
const TokenList = require("../models/tokenlist.model");
const { ADMIN } = require("../utils/role");

exports.load = async (req, res, next, id) => {
  try {
    const token = await TokenList.get(id);
    req.locals = { token, permittedUserId: token.user._id };
    return next();
  } catch (error) {
    return next(error);
  }
};

exports.get = (req, res) => res.json(req.locals.token.transform());

exports.create = async (req, res, next) => {
  try {
    const token = new TokenList(req.body);
    token.user = req.user;
    const savedTokenlist = await token.save();
    res.status(httpStatus.CREATED);
    res.json(savedTokenlist.transform());
  } catch (error) {
    next(error);
  }
};

exports.update = (req, res, next) => {
  const tokenData = req.body;
  const token = Object.assign(req.locals.token, tokenData);

  token
    .save()
    .then((savedTokenData) => res.json(savedTokenData.transform()))
    .catch((e) => next(e));
};

exports.list = async (req, res, next) => {
  try {
    const query = { ...req.query };
    if (req.user.role != ADMIN) {
      query["userId"] = req.user._id;
    }
    let tokenlist = await TokenList.list(query);
    res.json(tokenlist);
  } catch (error) {
    next(error);
  }
};

exports.remove = (req, res, next) => {
  const { token } = req.locals;

  token
    .remove()
    .then(() => res.status(httpStatus.NO_CONTENT).end())
    .catch((e) => next(e));
};
