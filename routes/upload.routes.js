const { verifySignin } = require("../middleware");
const controller = require("../controllers/upload.controller");
const path = require("path");
const multer = require("multer");
const express = require("express");
const router = express.Router();

const storage = multer.diskStorage({
  destination: "videos", // Destination to store video
  filename: (req, file, cb) => {
    console.log("destination");
    console.log(req.body);
    console.log("destination");
    // console.log("file=========>" + file);
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const videoUpload = multer({
  storage: storage,
  limits: {
    fileSize: 100000000, // 10000000 Bytes = 10 MB
  },
  fileFilter(req, file, cb) {
    // upload only mp4 and mkv format
    if (!file.originalname.match(/\.(mp4|MPEG-4|mkv)$/)) {
      return cb(new Error("Please upload a video"));
    }
    cb(undefined, true);
  },
});

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.post(
  "/api/upload/upload",
  [verifySignin.authenticate],
  controller.upload
);

router.post(
  "/api/upload/filesave",
  videoUpload.single("video"),

  (req, res) => {
    console.log("123123123");
    console.log(req.body);
    console.log("123123123");
    res.send(req.file);
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

// router.post(
//   "/api/upload/filesave",
//   [verifySignin.authenticate],
//   controller.filesave
// );

// router.post(
//   "/api/user/setPassword",
//   [authJwt.verifyToken, authJwt.isAdmin],
//   controller.adminBoard
// );

module.exports = router;
