const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Role = db.role;
const Upload = db.upload;



exports.upload = async (req, res) => {
    try {
        if (req.userId) {
          console.log('upload controller')
          const upload = await Upload.create({
            video_name: req.body.video_name,
            user_id : req.userId
          }).then((upload) => {
            res.send({ code:200, message: "uploaded successfully!" });
          })
        }
        else 
            res.send('not registerd')

      } catch (error) {
        res.status(500).send({ message: error.message });
      }
};
