const { Category } = require('../database/models');

const create = async (body) => {
  const { name } = body;
  const response = await Category.create({ name });
  return response;
};

const getAll = async () => Category.findAll();

module.exports = { create, getAll };
