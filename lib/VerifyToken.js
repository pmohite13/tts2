// if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development';

// const env = process.env.NODE_ENV;

var jwt = require('jsonwebtoken');
// var config = require('../config');
// var config = require(`../../../config/config.${env}.js`);
var config = require(`./configLoader`);


function verifyToken(req, res, next) {
    console.log('inside verifyToken');
    var token = req.headers['x-access-token'];
    if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, config.secret, function (err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        req.userId = decoded.id;
        next();
    });
}

module.exports = verifyToken;