const express = require("express");
const userRoutes = require("./user.route");
const authRoutes = require("./auth.route");
const tokenRoutes = require("./tokenlist.route");

const router = express.Router();

router.use("/", authRoutes);
router.use("/users", userRoutes);
router.use("/tokenlist", tokenRoutes);

module.exports = router;
