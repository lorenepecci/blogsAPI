const { User } = require('../database/models');
const { generateJWTToken } = require('../utils/generateJWT');

const create = async (body) => {
  const { displayName, email, password, image } = body;
  const finduser = await User.findOne({
    where: { email },
    attributes: { exclude: ['password'] },
  });

  if (finduser) {
    const error = { status: 409, message: 'User already registered' };
    throw error;
  }

  const newUser = await User.create({ displayName, email, password, image });
  const token = generateJWTToken(JSON.stringify(newUser));
  return { token };
};

const getAll = async () => User.findAll({ attributes: { exclude: ['password'] } });

const get = async (id) => {
  const response = await User.findByPk(id, { attributes: { exclude: ['password'] } });
  return response;
};
const findUserLogged = (userEmail) => User.findAll()
    .then((all) => all.find((item) => item.email === userEmail));

const remove = async (userEmail) => {
  const userLogged = await findUserLogged(userEmail).then((item) => item.id);
  const removed = await User.destroy({ where: { id: userLogged } });

  return removed > 0;
};  

module.exports = {
  create,
  getAll,
  get,
  remove,
};