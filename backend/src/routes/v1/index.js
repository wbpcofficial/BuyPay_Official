const express = require("express");
const userRoutes = require("./user.route");
const authRoutes = require("./auth.route");
const timezoneRoutes = require("./tokenlist.route");

const router = express.Router();

router.use("/", authRoutes);
router.use("/users", userRoutes);
router.use("/timezones", timezoneRoutes);

module.exports = router;
