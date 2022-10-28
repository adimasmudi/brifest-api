const multer = require("multer");
const path = require("path");
const fs = require("fs");
// import uuid from "uuid/v4";

const storageFile = multer.diskStorage({
  destination: function (req, file, cb) {
    var dir = `public/images`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploadFile = multer({
  storage: storageFile,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkImageType(file, cb);
    // if (file.fieldname === "images") checkImageType(file, cb);
    // if (file.fieldname === "prospektus") checkFileType(file, cb);
    // if (file.fieldname === "buktiBayar") checkImageType(file, cb);
    // if (file.fieldname === "TTD") checkImageType(file, cb);
    // if (file.fieldname === "buktiTransfer") checkImageType(file, cb);
  },
}).fields([
  { name: "images", maxCount: 1 },
  { name: "prospektus", maxCount: 1 },
  { name: "buktiBayar", maxCount: 1 },
  { name: "buktiTransfer", maxCount: 1 },
]);

// // Check file Type
function checkFileType(file, cb) {
  // Allowed ext
  const fileTypes = /pdf|doc|docx|pptx/;
  // Check ext
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb("Error: Documents Only !!!");
  }
}

// // Check file Type
function checkImageType(file, cb) {
  // Allowed ext
  const fileTypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb("Error: Images Only !!!");
  }
}

module.exports = { uploadFile };
