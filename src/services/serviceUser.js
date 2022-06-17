const { User } = require('../database/models');

const create = (body) => {
  const { displayName, email, password, image } = body;
  return User.create({ displayName, email, password, image });
};

module.exports = {
  create,
};