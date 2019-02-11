const express = require('express');
const router = express.Router();
var impl = require('./impl');

router.post('/createNewTask', isLoggedIn, impl.createNewTask);
router.post('/completeTask', isLoggedIn, impl.completeTask);
router.post('/reviewConsumer', isLoggedIn, impl.reviewConsumer);
router.post('/reviewWorker', isLoggedIn, impl.reviewWorker);


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
