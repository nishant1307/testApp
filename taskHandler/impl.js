let db = require('../database/models/index');
let User = db.user;
let Task = db.task;
let UserTask = db.userTask;
let bcrypt = require('bcrypt-nodejs');
let jwt = require('jsonwebtoken');
let configAuth = require('../config');
let Promise = require('bluebird');

function generateHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

module.exports = {

  createNewTask: (req, res) => {
    let newTask = new Object();
    newTask.name= req.body.name;
    newTask.description= req.body.description;
    newTask.categoryID= req.body.categoryID;
    newTask.status = false;
    newTask.location= req.body.location;
    Task.create(newTask).then(task => {
      User.findOne({
        where: {
          email: req.body.workerEmail
        }
      }).then(worker => {
        UserTask.create({
          task_id: task.uniqueId,
          taskBy: req.user.uniqueId,
          taskFor: worker.uniqueId
        }).then(userTask => {
          res.send({
            status: true,
            message: "Task created"
          });
        });
      });
    });
  },

  completeTask: (req, res) => {
    UserTask.findOne({
      where: {
        task_id: req.body.taskID
      }
    }).then(task => {
      task.status = true;
      task.save().then(result=> {
        res.send({
          status: true,
          message: "Task completed"
        });
      })
    })
  },

  reviewConsumer: (req, res) => {
    UserTask.findOne({
      where: {
        task_id: req.body.taskID
      }
    }).then(task => {
      //Check if the task is complete
      if(task.status==true){
        User.findOne({
          where: {
            uniqueId: task.taskBy
          }
        }).then(user => {
          user.consumerRating = ((user.consumerRating*user.consumerTaskCount)+req.body.score)/(user.consumerTaskCount+1);
          user.consumerRating +=1;
          user.save().then(myUser=> {
            res.send({
              status: true,
              message: "Consumer review complete"
            });
          })
        })
      }
      else {
        res.send({
          status: false,
          message: "Task not complete"
        });
      }
    });
  },

  reviewWorker: (req, res) => {
    UserTask.findOne({
      where: {
        task_id: req.body.taskID
      }
    }).then(task => {
      //Check if the task is complete
      if(task.status==true){
        User.findOne({
          where: {
            uniqueId: task.taskFor
          }
        }).then(user => {
          user.consumerRating = ((user.consumerRating*user.consumerTaskCount)+req.body.score)/(user.consumerTaskCount+1);
          user.consumerRating +=1;
          user.save().then(myUser=> {
            res.send({
              status: true,
              message: "Worker review complete"
            });
          })
        })
      }
      else {
        res.send({
          status: false,
          message: "Task not complete"
        });
      }
    });
  },

  taskListForWorker: (req, res) => {
    UserTask.findAll({
      where: {
        taskFor: req.client.uniqueId
      }
    }).then(tasks => {
      res.send({
        status: true,
        taskList: tasks
      })
    });
  },

  taskListForConsumer: (req, res) => {
    UserTask.findAll({
      where: {
        taskBy: req.client.uniqueId
      }
    }).then(tasks => {
      res.send({
        status: true,
        taskList: tasks
      })
    });
  }


}
