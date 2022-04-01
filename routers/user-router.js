const express = require("express");
const { createUser, getSingleUser, getAllUser } = require("../controllers/user-controller");
const router = express.Router();

router.route("/").get(getAllUser)

router.route("/register").post(createUser)

router.route("/login/:id").get(getSingleUser)

module.exports = router
