const { DataTypes, Sequelize } = require("sequelize");

const sequelize = new Sequelize("sqlite::memory:");

const User = sequelize.define("Users", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
  },
});

module.exports = { User };
