const express = require('express');
const { validate } = require('express-validation');
const controller = require('../../controllers/user.controller');
const { authorize } = require('../../middlewares/auth');
const { ADMIN, MANAGER } = require('../../utils/role');
const {
  listUsers,
  createUser,
  updateUser,
} = require('../../validations/user.validation');

const router = express.Router();

router.param('userId', controller.load);
router
  .route('/')
  .get(authorize(ADMIN, MANAGER), validate(listUsers), controller.list)
  .post(authorize(ADMIN, MANAGER), validate(createUser), controller.create);

router
  .route('/:userId')
  .get(authorize(ADMIN, MANAGER), controller.get)
  .patch(authorize(ADMIN, MANAGER), validate(updateUser), controller.update)
  .delete(authorize(ADMIN, MANAGER), controller.remove);


module.exports = router;
