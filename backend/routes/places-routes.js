const express = require("express");
const fileUpload = require('../middlewares/file-upload');

const { check } = require("express-validator");
const router = express.Router();
const HttpError = require("../modals/http-error");
const placesController = require("../controllers/places-controller");

router.get("/:pid", placesController.getPlaceByID);

router.get("/users/:uid", placesController.getPlaceByUserID);

router.post(
  "/", fileUpload.single("placeImage"),
  [check("title").not().isEmpty(), check("description").not().isEmpty()],
  placesController.createPlace
);

router.patch(
  "/:pid",
  [check("title").not().isEmpty(), check("description").not().isEmpty()],
  placesController.editPlace
);

router.delete("/:pid", placesController.deletePlace);

module.exports = router;
