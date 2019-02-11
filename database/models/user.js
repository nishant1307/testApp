'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    uniqueId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true, // checks for email format (foo@bar.com)
      },
      allowNull: false,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    workerRating: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },

    workerTaskCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },

    consumerRating: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },

    consumerTaskCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },

    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
  }, {});
  user.associate = function(models) {

  };
  return user;
};
