const jwt = require('jsonwebtoken');
const validator = require('validator');
const config = require("../config/auth.config.js");

module.exports = {
    
 	authenticate: (req, res, next) => {
		// Retrieve token from header
        // console.log(req.path)
        // // next()
		const authorizationHeader = req.headers['authorization'];
		// Reserving variable for token
        console.log(authorizationHeader)
		let token;
		// Get received token
		if (authorizationHeader) token = authorizationHeader.split(' ')[1];
        console.log(token);
		// Bypass authorization middleware if path is "users/login"
		if (req.path === '/api/auth/signin') next();
		// Token exists then validate to provide access or not
		else if (token && !validator.isEmpty(token)) {
			// Validate token with the secret
			jwt.verify(token, config.secret, (err, decoded) => {
                if (err) {
                  return res.status(401).send({
                    message: "Unauthorized!",
                  });
                }
                req.userId = decoded.id;
                next();
              });
		} else {
			res.status(401).json({ error: "Unauthorized! You must be logged in to use this service!" });
			res.end();
		}
	}
}
