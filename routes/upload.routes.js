const { verifySignin } = require("../middleware");
const controller = require("../controllers/upload.controller");
const express = require('express');
const router = express.Router();


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
	


	// router.post(
  //   "/api/user/setPassword",
  //   [authJwt.verifyToken, authJwt.isAdmin],
  //   controller.adminBoard
  // );


module.exports = router;