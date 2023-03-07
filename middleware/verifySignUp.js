const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    // Email
    user = await User.findOne({
      where: {
        email: req.body.email,
        status: 1
      }
    });

    if (user) {
      return res.status(400).send({
        message: "Failed! Email is already in use!"
      });
    }

    next();
  } catch (error) {
    return res.status(500).send({
      message: error.message
    });
  }
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    console.log('role check')
    console.log(req.body.roles[0])
    // for (let i = 0; i < req.body.roles.length; i++) {
      
    if (!ROLES.includes(req.body.roles)) {
        res.status(400).send({
            message: "Failed! Role does not exist = " + req.body.roles
        });
        return;
        }
    // }
  }
  
  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
};

module.exports = verifySignUp;
