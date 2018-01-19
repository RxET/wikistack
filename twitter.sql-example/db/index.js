const db = require('./_db');

const User = require('./User')
const Tweet = require('./Tweet')

Tweet.belongsTo(User);
User.hasMany(Tweet);

//foreign key 'userId' on tweet
//give tweets magic methods

module.exports = db;
