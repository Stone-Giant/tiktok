const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Role = db.role;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

exports.getAllUser = async (req, res) => {
  try {
    if (req.userId) {
      console.log("req query");
      const user = await User.findAll({}).then((user) => {
        console.log("getAllUser");
        res.send([
          {
            code: 200,
            message: "All Users displayed",
            data: user,
          },
        ]);
      });
    } else res.send("not registerd");
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.setState = async (req, res) => {
  try {
    if (req.body.user_email) {
      let newStatus = 1;
      const getUser = await User.findOne({
        where: {
          email: req.body.user_email,
        },
      })
        .then((user) => {
          console.log("asdasd", user.dataValues.status);

          if (user.dataValues.status > 0) {
            newStatus = 0;
          } else {
            newStatus = 1;
          }
        })
        .catch((error) => {
          console.log("111");
          console.log(error);
        });

      const user = await User.update(
        { status: newStatus },
        {
          where: {
            email: req.body.user_email,
          },
        }
      )
        .then((user) => {
          console.log("Changed User Status", user);
          if (user) {
            console.log(user);
            res.send({
              code: 200,
              message: "Changed User Status successfully!",
            });
          } else {
            res.send({ code: 300, message: "User is not registered" });
          }
        })
        .catch((error) => {
          console.log("ererererer");
          console.log(error);
        });
    } else {
      console.log("asdasd");
      res.send({ code: 400, message: "Unknown error occurs!" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
