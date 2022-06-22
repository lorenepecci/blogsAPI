const Sequelize = require('sequelize');
const { BlogPost, Category, User, PostCategory } = require('../database/models');

const findUserLogged = (userEmail) => User.findAll()
    .then((all) => all.find((item) => item.email === userEmail));

const create = async ({ title, content, categoryIds }, userEmail) => {
  const userId = await findUserLogged(userEmail).then((item) => item.id);
  const findCategorys = await Category.findAll();
  // ve se as categorias colocadas já existem na tab Categorys
  const arrBool = categoryIds.map((cat) => findCategorys.some((item) => item.id === cat));
  if (arrBool.some((item) => item === false)) {
    const erro = { status: 400, message: '"categoryIds" not found' };
    throw erro;
  }
  
  const createPost = await BlogPost.create({
    title,
    content,
    userId,
    updated: new Date(),
    published: new Date(),
  });
  await Promise.all(categoryIds.map(async (categoryId) => {
    await PostCategory.create({ postId: createPost.id, categoryId });
  }));
  return createPost;
};  

const getAll = async () => {
  const response = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
      }],
  });
  return response;
};

const getId = async (id) => {
  const response = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
      }],
  });
  return response;
};

const update = async ({ title, content }, userEmail, id) => {
  const userLogged = await findUserLogged(userEmail).then((item) => item.id);
  const findPostUserId = await BlogPost.findOne({
    where: { id },
  }).then((obj) => obj.userId);
  
  if (userLogged !== findPostUserId) {
    const erro = { status: 401, message: 'Unauthorized user' };
    throw erro;
  }
  await BlogPost.update({
    title,
    content,
    userId: userLogged,
    updated: new Date(),
    published: new Date(),
  }, { where: { id } });
};  

const remove = async (userEmail, id) => {
  const userLogged = await findUserLogged(userEmail).then((item) => item.id);
  const findPostUserId = await BlogPost.findOne({
    where: { id },
  }).then((obj) => obj.userId);
  
  if (userLogged !== findPostUserId) {
    const erro = { status: 401, message: 'Unauthorized user' };
    throw erro;
  }
  await BlogPost.destroy({ where: { id } });
};  

const getQuery = async (query) => {
  console.log('queryyyyyyyyyyyy', query);
  const { Op } = Sequelize;
  const response = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
      },
    ],
    where: {
      [Op.or]: { title: { [Op.like]: `%${query}%` }, content: { [Op.like]: `%${query}%` },
      },
    },
  });
  return response;
};
 
module.exports = {
  create,
  getAll,
  getId,
  update,
  remove,
  getQuery,
};
