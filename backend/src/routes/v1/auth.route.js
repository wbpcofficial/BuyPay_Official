const express = require('express');
const { validate } = require('express-validation');
const controller = require('../../controllers/auth.controller');
const {
  login,
  register,
  refresh,
} = require('../../validations/auth.validation');
const { authorize } = require('../../middlewares/auth');

const router = express.Router();

// Routes for /auth
router.route('/register')
  .post(validate(register), controller.register);
router.route('/login')
  .post(validate(login), controller.login);
router.route('/profile')
  .patch(authorize(), controller.updateProfile);
router.route('/refresh-token')
  .post(validate(refresh), controller.refresh);


module.exports = router;
