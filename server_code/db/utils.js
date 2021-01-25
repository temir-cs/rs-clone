const knex = require('./knex');

function createUser(user) {
  return knex('users').insert(user);
}

function getUser(user) {
  return knex('users').where('username', user.username).where('password', user.password).select('*');
}

function getScores() {
  return knex('leaderboard').select('*');
}

function setScore(data) {
  return knex('leaderboard').insert(data);
}

// function updateUser(id, username) {
//   return knex('users').where('id', id).update(username);
// }

module.exports = {
  createUser,
  getUser,
  getScores,
  setScore,
};
