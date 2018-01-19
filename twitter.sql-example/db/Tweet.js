const Sequelize = require('sequelize');
const db = require('./_db');

const Tweet = db.define('tweet', {
  content: Sequelize.STRING,
})

module.exports = Tweet;
