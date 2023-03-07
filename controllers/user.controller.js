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
          console.log('req query')
          const user = await User.findAll({
            where: {
                status: 1
              },
          }).then((user) => {
            
            console.log('getAllUser')
            res.send([{ 
              code:200,
              message: "All Users displayed",
              data: user}]);
          })
          
        }
        else 
            res.send('not registerd')

      } catch (error) {
        res.status(500).send({ message: error.message });
      }
};

exports.setState = async (req, res) => {
    try {
        if (req.body.del_email) {
          console.log('req query')
          console.log('dfdfd' ,req.body.del_email)
          const user = await User.update(
            {status: 0},
            {where: {
                email: req.body.del_email,
                status: 1
              },
            }).then((user) => {
                console.log('user deactivate')
                res.send({ message: "User deactivated successfully!"});
           
          })
          
        } else {
          
          res.send({ message: "User is not registered" });
        }
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
}
