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
 
module.exports = {
  create,
  getAll,
};
