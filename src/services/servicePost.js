 const { BlogPost, Categorie, User, PostCategory } = require('../database/models');

const findUserLogged = (userEmail) => User.findAll()
    .then((all) => all.find((item) => item.email === userEmail));

const create = async ({ title, content, categoryIds }, userEmail) => {
  const userId = await findUserLogged(userEmail).then((item) => item.id);
  const findCategories = await Categorie.findAll();
  // ve se as categorias colocadas já existem na tab categories
  const arrBool = categoryIds.map((cat) => findCategories.some((item) => item.id === cat));
  if (arrBool.some((item) => item === false)) {
    const erro = { status: 400, message: '\'categoryIds\' not found' };
    throw erro;
  }
  const createPost = await BlogPost.create({
    title,
    content,
    userId,
    updated: new Date(),
    published: new Date(),
  });
  return createPost;
};  

const getAll = async (userEmail) => {
  const user = await findUserLogged(userEmail);
  console.log(user);
  return BlogPost.findAll({
    include: [
      { model: User, as: 'user' },
      { model: PostCategory, as: 'postcategorie' },
    ],
    attributes: { exclude: ['password'] },
  });
};

module.exports = {
  create,
  getAll,
};
