const config = require("../config/auth.config.js");
const multer = require("multer");
const db = require("../models");
const User = db.user;
const Role = db.role;
const Upload = db.upload;

exports.upload = async (req, res) => {
  try {
    if (req.userId) {
      console.log("upload controller");
      const upload = await Upload.create({
        video_name: req.body.video_name,
        user_id: req.userId,
      }).then((upload) => {
        res.send({ code: 200, message: "uploaded successfully!" });
      });
    } else res.send("not registerd");
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.filesave = async (req, res) => {
  // try {
  //   if (req.userId) {
  //     console.log("upload controller");
  //     const upload = await Upload.create({
  //       video_name: req.body.video_name,
  //       user_id: req.userId,
  //     }).then((upload) => {
  //       res.send({ code: 200, message: "uploaded successfully!" });
  //     });
  //   } else res.send("not registerd");
  // } catch (error) {
  //   res.status(500).send({ message: error.message });
  // }
  console.log("filesave");
  // const file = req.file;
  // console.log("file:hejs-------->", file);
  // if (!file) {
  //   const error = new Error("Please upload a file");
  //   error.httpStatusCode = 400;
  //   return error;
  // }
  // res.send(file);
};
