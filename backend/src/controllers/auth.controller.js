const httpStatus = require('http-status');
const User = require('../models/user.model');
const RefreshToken = require('../models/refreshToken.model');
const moment = require('moment-timezone');
const { jwtExpirationInterval } = require('../config/vars');
const Role = require('../utils/role');
const svgCaptcha = require('svg-captcha');
const { response } = require('express');

function generateTokenResponse(user, accessToken) {
  const refreshToken = RefreshToken.generate(user).token;
  const expires = moment().add(jwtExpirationInterval, 'minutes');
  return {
    accessToken,
    refreshToken,
    expires,
  };
}

exports.register = async (req, res, next) => {
  try {
    const userData = req.body;
    userData.role = Role.REGULAR;
    const user = await new User(userData).save();
    const userTransformed = user.transform();
    const token = generateTokenResponse(user, user.token());
    res.status(httpStatus.CREATED);
    return res.json({ token, user: userTransformed });
  } catch (error) {
    return next(User.checkDuplicateEmail(error));
  }
};

exports.login = async (req, res, next) => {
  try {
    const { user, accessToken } = await User.findAndGenerateToken(req.body);
    const token = generateTokenResponse(user, accessToken);
    const userTransformed = user.transform();
    return res.json({ token, user: userTransformed });
  } catch (error) {
    return next(error);
  }
};

exports.updateProfile = (req, res, next) => {
  const user = Object.assign(req.user, req.body);

  user.save()
    .then(savedUser => res.json(savedUser.transform()))
    .catch(e => next(User.checkDuplicateEmail(e)));
};

exports.refresh = async (req, res, next) => {
  try {
    const { email, refreshToken } = req.body;
    const refreshObject = await RefreshToken.findOneAndRemove({
      userEmail: email,
      token: refreshToken,
    });
    const { user, accessToken } = await User.findAndGenerateToken({ email, refreshObject });
    const response = generateTokenResponse(user, accessToken);
    return res.json(response);
  } catch (error) {
    return next(error);
  }
};

exports.getCaptcha = async (req, res, next) => {
  try {
    const captcha = svgCaptcha.create({ size: 9, noise: 1 });
    res.send({ success: true, data: captcha });
  } catch (error) {
    return next(error);
  }
}