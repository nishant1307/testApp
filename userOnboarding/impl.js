let db = require('../database/models/index');
let User = db.user;
let bcrypt = require('bcrypt-nodejs');
let jwt = require('jsonwebtoken');
let configAuth = require('../config');
let Promise = require('bluebird');

function generateHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

module.exports = {

  userRegistration: (req, res) => {
    let newUser = new Object();
    newUser.name= req.body.name;
    newUser.email= req.body.email;
    newUser.workerId =
    newUser.password = generateHash(req.body.password);
    User.create(newUser).then(user=> {
      res.send({
        status: true,
        message: "User created successfully"
      });
    })
  },

  userLogin: (req, res) => {
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(client => {
      if(!client){
        res.send({
          status: "false",
          message: "User not present"
        });
      } else if (!bcrypt.compareSync(req.body.password, client.password)){
        res.send({
          status: true,
          message: "Wrong password"
        });
      } else {
        const token = jwt.sign({
          clientId: client.uniqueId,
          role: req.body.role;
        }, configAuth.jwtAuthKey.secret, {
            expiresIn: configAuth.jwtAuthKey.tokenLife
        });

        res.send({status: true, clientToken: token})

      }
    })
  }

}
