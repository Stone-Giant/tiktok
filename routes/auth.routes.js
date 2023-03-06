const { verifySignUp, verifySignin } = require('../middleware');
const controller = require('../controllers/auth.controller');
const express = require('express');
const router = express.Router();

router.use(function (req, res, next) {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  );
  next();
});

// routes
router.post(
    '/api/auth/signup', 
    [
        verifySignUp.checkDuplicateUsernameOrEmail,
        verifySignUp.checkRolesExisted
    ],
    controller.signup);
// router.post('/api/auth/google', controller.google);
router.post('/api/auth/signin',verifySignin.authenticate, controller.signin);
router.post('/api/auth/verify', verifySignin.authenticate, controller.verify);
// router.post('/api/auth/change_password', controller.update);
// router.post('/api/auth/upgrade', controller.upgrade);
// router.post('/api/auth/account', controller.account);
// router.post('/api/auth/gmailGet', controller.getByGmail);

module.exports = router;