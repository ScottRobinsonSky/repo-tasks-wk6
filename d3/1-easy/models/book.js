const { DataTypes, Sequelize } = require("sequelize");

const sequelize = new Sequelize("sqlite::memory:");

const Book = sequelize.define("Books", {
  isbn: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  edition: {
    type: DataTypes.STRING,
  },
  format: {
    type: DataTypes.STRING,
  },
  language: {
    type: DataTypes.STRING,
  },
  publicationDate: {
    type: DataTypes.STRING,
  },
  publisher: {
    type: DataTypes.STRING,
  },
});

module.exports = { Book };
