const db = require('../models');
const moment = require('moment');
const config = require('../config/auth.config');
// const { OAuth2Client } = require('google-auth-library');
// const client = new OAuth2Client(
//   '382447144454-18kdqo71vffauq6c6q2t53bi8u7artae.apps.googleusercontent.com'
// );
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

exports.signup = async (req, res) => {
  // Save User to Database

  try {
    const user = await User.create({
      status: 1,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    if (req.body.roles) {
      
      const roles = await Role.findOne({
        where: {
          name:  req.body.roles
        },
      }).then((role) => {
        user.update(
          {roles: role.dataValues.id},
          {where: req.body.email}
        )
        res.send({ message: "User registered successfully!" });
      })
      
    } else {
      user.update(
        {roles: 1},
        {where: req.body.email}
      )
      res.send({ message: "User registered successfully!" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.verify = (req, res) => {
  console.log('verofy')
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (user) {
      res.status(400).send({
        message: 'Failed! Email is already in use!',
      });
      return;
    } else {
      res.status(200).send({
        message: 'No use',
      });
    }
  });
};

// exports.update = (req, res) => {
//   User.update(
//     {
//       password: bcrypt.hashSync(req.query.password, 8),
//     },
//     {
//       where: {
//         email: req.query.email,
//       },
//     }
//   ).then(() => {
//     res.status(200).send({ CODE: 200, message: 'success' });
//   });
// };
// exports.account = (req, res) => {
//   User.update(
//     {
//       username: req.query.username,
//     },
//     {
//       where: {
//         email: req.query.email,
//       },
//     }
//   ).then(() => {
//     res.json({ CODE: 200, message: 'success' });
//   });
// };

// exports.upgrade = (req, res) => {
//   console.log(req);
//   User.update(
//     {
//       upgrade: req.query.level,
//     },
//     {
//       where: {
//         id: req.query.id,
//       },
//     }
//   ).then(() => {
//     res.json({ message: 'success' });
//   });
// };

// exports.google = async (req, res) => {
//   console.log('here=', req);
//   const { token } = req.body;
//   const ticket = await client.verifyIdToken({
//     idToken: token,
//     audience:
//       '382447144454-18kdqo71vffauq6c6q2t53bi8u7artae.apps.googleusercontent.com',
//   });
//   const { name, email } = ticket.getPayload();
//   console.log('payload=', ticket.getPayload());
//   const user = await User.upsert({
//     where: { email: email },
//     update: { name },
//     create: { name, email },
//   });
//   res.status(201);
//   res.json(user);
// };

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400, // 24 hours
    });



    return res.status(200).send({
      email: user.email,
      accessToken: token,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

// exports.getByGmail = (req, res) => {
//   User.findOne({
//     where: {
//       email: req.query.gmail,
//     },
//   })
//     .then((user) => {
//       if (!user) {
//         res.status(200).send({ message: 'have to register', data: 0 });
//       } else {
//         res.status(201).send({ message: 'found', data: user });
//       }
//     })
//     .catch((err) => {
//       console.log('googleSinginErr=', err);
//     });
// };