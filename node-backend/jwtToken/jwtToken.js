const jwt = require('jsonwebtoken');

var createToken = function(auth) {
    return jwt.sign({
            id: auth.id
        }, 'my-secret',
        {
            expiresIn: process.env.JWT_expire_time
        });
};

module.exports = {

  generateToken: function(req, res, next) {
	  console.log("onkar here");
      req.token = createToken(req.auth);
      return next();
  },
  sendToken: function(req, res) {
	  console.log(req.token);
      res.setHeader('x-auth-token', req.token);
      return res.status(200).send(JSON.stringify(req.user));
  }
};