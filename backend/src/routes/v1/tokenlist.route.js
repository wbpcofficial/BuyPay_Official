const express = require("express");
const { validate } = require("express-validation");
const controller = require("../../controllers/tokenlist.controller");
const { authorize } = require("../../middlewares/auth");
const {
  listTimezones,
  createTimezone,
  updateTimezone,
} = require("../../validations/timezone.validation");
const router = express.Router();

router.param("tokenId", controller.load);

// router
//   .route("/")
//   .get(authorize(), validate(listTimezones), controller.list)
//   .post(authorize(), validate(createTimezone), controller.create);

// router
//   .route("/:timezoneId")
//   .get(authorize(), controller.get)
//   .patch(authorize(), validate(updateTimezone), controller.update)
//   .delete(authorize(), controller.remove);

router
  .route("/")
  .get(authorize(), controller.list)
  .post(authorize(), controller.create);

router
  .route("/:timezoneId")
  .get(authorize(), controller.get)
  .patch(authorize(), controller.update)
  .delete(authorize(), controller.remove);

module.exports = router;
