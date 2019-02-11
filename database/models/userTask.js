'use strict';
module.exports = (sequelize, DataTypes) => {
  const userTask = sequelize.define('userTask', {
    uniqueId:{
      allowNull:false,
      type:DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
    },

    task_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    taskBy: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    taskFor: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    taskStatus: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue:DataTypes.NOW
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue:DataTypes.NOW
    },
}, {});
  userTask.associate = function (models) {

  };
  return userTask;
};
