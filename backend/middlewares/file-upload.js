const multer = require("multer");
const path = require("path");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

// console.log(__dirname);

const fileUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, "..", "uploads", "images"));
    },
    filename: (req, file, cb) => {
      console.log(file);
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, Date.now() + "." + ext);
    },
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    let error = isValid ? null : new Error("Invalid MIME type!");
    cb(error, isValid);
  },
});

module.exports = fileUpload;
