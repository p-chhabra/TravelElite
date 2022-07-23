const express = require("express");

const router = express.Router();
const usersController = require("../controllers/users-controller");
const HttpError = require("../modals/http-error");
const { check } = require("express-validator");
const fileUpload = require('../middlewares/file-upload');

router.get("/", usersController.getUsers);

router.post("/login", usersController.login);

router.post(
  "/signup",
  fileUpload.single('image'),
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  usersController.signup
);

module.exports = router;
