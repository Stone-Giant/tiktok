const { verifySignin } = require("../middleware");
const controller = require("../controllers/user.controller");
const express = require('express');
const router = express.Router();


  router.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  router.get(
    "/api/user/getAllUser",
    [verifySignin.authenticate],
    controller.getAllUser
  );
	
	router.post(
    "/api/user/setState",
		[verifySignin.authenticate, verifySignin.isAdmin],
    controller.setState
  );

	// router.post(
  //   "/api/user/setPassword",
  //   [authJwt.verifyToken, authJwt.isAdmin],
  //   controller.adminBoard
  // );


module.exports = router;