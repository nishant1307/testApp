const express = require('express');
const router = express.Router();
var impl = require('./impl');
var configAuth = require('../config');

router.post('/createNewTask', isLoggedIn, isConsumer, impl.createNewTask);
router.post('/completeTask', isLoggedIn, isWorker, impl.completeTask);
router.post('/reviewConsumer', isLoggedIn, isWorker, impl.reviewConsumer);
router.post('/reviewWorker', isLoggedIn, isConsumer, impl.reviewWorker);
router.get('/taskListForWorker', isLoggedIn, isWorker, impl.reviewWorker);
router.get('/taskListForConsumer', isLoggedIn, isWorker, impl.reviewWorker);


module.exports = router;

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  var token = req.body.clientToken;
  // JWT enabled login strategy for end user
  jwt.verify(token, configAuth.jwtAuthKey.secret, function (err, decoded) {
    if (err) {
      console.log(err);
      return res.send({ status: false, message: "Please login again" })
    } else {
      Client.findOne({
        where: {
          uniqueId: decoded.clientId
        }
      }).then(client => {
        req.client = client;
        next();
      });
    }
  });

}


// middleware functions to check roles
function isConsumer(req, res, next) {
  var token = req.body.clientToken;
  // JWT enabled login strategy for end user
  jwt.verify(token, configAuth.jwtAuthKey.secret, function (err, decoded) {
    if (err) {
      console.log(err);
      return res.send({ status: false, message: "Please login again" })
    } else {
      if(decoded.role=='consumer'){
        next();
      }
      else {
        res.send({
          status: false,
          message: "Not a consumer"
        })
      }
    }
  });

}

function isWorker(req, res, next) {
  var token = req.body.clientToken;
  // JWT enabled login strategy for end user
  jwt.verify(token, configAuth.jwtAuthKey.secret, function (err, decoded) {
    if (err) {
      console.log(err);
      return res.send({ status: false, message: "Please login again" })
    } else {
      if(decoded.role=='worker'){
        next();
      }
      else {
        res.send({
          status: false,
          message: "Not a worker"
        })
      }
    }
  });

}
