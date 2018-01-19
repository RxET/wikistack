const Sequelize = require('sequelize');
const db = require('./_db');

const User = db.define('user', {
  name: Sequelize.STRING,
  picture_url: Sequelize.STRING
})

module.exports = User;
