const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Role = db.role;
const Video = db.video;


exports.insertVideo = async (req, res) => {
  try {
    if (req.userId) {
      console.log('Video controller')
      const video = await Video.create({
        video_thumb_url: req.body.thumb,
        video_url: req.body.video,
        user_id : req.userId
      }).then((video) => {
        res.send({ code:200, message: "video successfully!" });
      })
    }
    else 
        res.send('not registerd')

  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
