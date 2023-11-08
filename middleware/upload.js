// Importing path to manipulate file name and multer to setup our file upload
const path = require("path");
const multer = require("multer");

// Setting up storage filename and destination
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/images");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

// Setting up multer upload function
let upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/jpg"
    ) {
      callback(null, true);
    } else {
      console.log("Only .jpg and .png files are supported!");
      callback(null, false);
    }
  },
  limits: {
    fileSize: 1000000,
  },
});

module.exports = upload;
