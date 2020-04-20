const express = require('express');
const router = express.Router();
const { generateToken, sendToken } = require('../jwtToken/jwtToken');
const passport = require('passport');
const request = require('request');
const bodyParser = require('body-parser');
require('../google_auth/google_auth')();
router.use(bodyParser.urlencoded({ extended: true }))

router.route('/google')
.post(passport.authenticate('google-token', {session: false}), function(req, res,next) {
	console.log("in passport auth function");
        if (!req.user) {
			console.log("hello");
            return res.send(401, 'User Not Authenticated by google');
        }
        req.auth = {
            id: req.user.id
        };
        next();
    }, generateToken, sendToken);

module.exports = router;
