let db = require('../database/models/index');
let User = db.user;
let
let bcrypt = require('bcrypt-nodejs');
let jwt = require('jsonwebtoken');
let configAuth = require('../config');
let Promise = require('bluebird');

function generateHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

module.exports = {

  createTask: (req, res) => {
    let newTask = new Object();
    newTask.name= req.body.name;
    newTask.description= req.body.description;
    newTask.categoryID= req.body.categoryID;
    newTask.status = false;
    newTask.location= req.body.location;

  }


}
