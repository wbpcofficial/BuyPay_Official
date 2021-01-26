const httpStatus = require("http-status");
const User = require("../models/user.model");
const RefreshToken = require("../models/refreshToken.model");
const PasswordResetToken = require("../models/passwordResetToken.model");
const moment = require("moment-timezone");
const { jwtExpirationInterval } = require("../config/vars");
const Role = require("../utils/role");
const svgCaptcha = require("svg-captcha");
const { response } = require("express");
const jwt = require("jwt-simple");
const { sendEmail } = require("../config/mailer");

function generateTokenResponse(user, accessToken) {
  const refreshToken = RefreshToken.generate(user).token;
  const expires = moment().add(jwtExpirationInterval, "minutes");
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

exports.forgotPassword = async (req, res, next) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email }).exec();
    if (user) {
      const passwordResetObj = await PasswordResetToken.generate(user);
      sendEmail(
        email,
        "Reset Password",
        `http://localhost:3000/resetpassword/${passwordResetObj.resetToken}`
      );
      res.send({ success: true });
    }
    throw new APIError({
      status: httpStatus.UNAUTHORIZED,
      message: "No account found with that email",
    });
  } catch (error) {
    return next(error);
  }
};

exports.checkToken = (req, res, next) => {
  let secret = "fe1a1915a379f3be5394b64d14794932-1506868106675";
  let payload = jwt.decode(req.query.token, secret);
  res.send({ success: true, data: payload });
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { email, password, resetToken } = req.body;
    const resetTokenObject = await PasswordResetToken.findOneAndRemove({
      userEmail: email,
      resetToken,
    });
    const err = {
      status: httpStatus.UNAUTHORIZED,
      isPublic: true,
    };

    if (!resetTokenObject) {
      err.message = "Cannot find matching reset token";
      throw new APIError(err);
    }
    if (moment().isAfter(resetTokenObject.expires)) {
      err.message = "Reset token is expired";
      throw new APIError(err);
    }
    const user = await User.findOne({ email }).exec();
    if (user) {
      user.password = password;
      try {
        await user.save();
        res.status(httpStatus.OK);
        return res.send({ success: true, message: "Password Updated" });
      } catch (e) {
        return next(e);
      }
    }
    throw new APIError({
      status: httpStatus.UNAUTHORIZED,
      message: "No account found with that email",
    });
  } catch (error) {
    return next(error);
  }
};

exports.updateProfile = (req, res, next) => {
  const user = Object.assign(req.user, req.body);

  user
    .save()
    .then((savedUser) => res.json(savedUser.transform()))
    .catch((e) => next(User.checkDuplicateEmail(e)));
};

exports.refresh = async (req, res, next) => {
  try {
    const { email, refreshToken } = req.body;
    const refreshObject = await RefreshToken.findOneAndRemove({
      userEmail: email,
      token: refreshToken,
    });
    const { user, accessToken } = await User.findAndGenerateToken({
      email,
      refreshObject,
    });
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
};
