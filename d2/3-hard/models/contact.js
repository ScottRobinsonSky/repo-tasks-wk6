const { DataTypes, Sequelize } = require("sequelize");

const sequelize = new Sequelize("sqlite::memory:");

const Contact = sequelize.define("Contact", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  emailAddress: {
    type: DataTypes.STRING,
  },
});

module.exports = { Contact };
