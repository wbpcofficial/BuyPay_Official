const httpStatus = require("http-status");
const passport = require("passport");
const APIError = require("../utils/APIError");
const { ADMIN } = require('../utils/role');


const handleJWT = (req, res, next, roles) => async (err, user, info) => {
  const error = err || info;
  const logIn = req.logIn;
  const apiError = new APIError({
    message: error ? error.message : "Unauthorized",
    status: httpStatus.UNAUTHORIZED
  });

  try {
    if (error || !user) throw error;
    await logIn(user, { session: false });
  } catch (e) {
    return next(apiError);
  }
  
  // Check if loggedin user has previledge to access the timezone
  if (user.role != ADMIN && req.locals && req.locals.permittedUserId && !user._id.equals(req.locals.permittedUserId)) {
    let error = new APIError({
      message: 'The user has no permission for this API',
      status: httpStatus.FORBIDDEN,
    });
    return next(error);
  }

  // Check if loggedin user has role for specific action
  if (roles.length !== 0 && !roles.includes(user.role)) {
    apiError.status = httpStatus.FORBIDDEN;
    apiError.message = "The user has no permission for this API";
    return next(apiError);
  } else if (err || !user) {
    return next(apiError);
  }

  req.user = user;

  return next();
};

exports.authorize = (...roles) => (req, res, next) =>
  passport.authenticate(
    "jwt",
    { session: false },
    handleJWT(req, res, next, roles)
  )(req, res, next);
