const { DataTypes, Sequelize } = require("sequelize");

const sequelize = new Sequelize("sqlite::memory:");

const Category = sequelize.define("Category", {
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Post = sequelize.define("Post", {
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  body: {
    type: DataTypes.STRING,
  },
});

Category.hasMany(Post);
Post.belongsTo(Category);

module.exports = { Category, Post };
