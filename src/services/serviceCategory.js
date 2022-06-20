const { Categorie } = require('../database/models');

const create = async (body) => {
  const { name } = body;
  const response = await Categorie.create({ name });
  return response;
};

const getAll = async () => Categorie.findAll();

module.exports = { create, getAll };
