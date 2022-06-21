const PostsCategoriesSchema = ( sequelize, dataTypes ) => {
  const PostsCategories = sequelize.define( "PostCategory",  {
    postId: {
      type: dataTypes.INTEGER,
      foreignKey: true,
    },
    categoryId: {
      type: dataTypes.INTEGER,
      foreignKey: true,
    }
  }, { timestamps: false } );
  PostsCategories.associate = ( models ) => {
    models.Category.belongsToMany( models.BlogPost, {
      as: 'blogpost',
      through: PostsCategories,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    } ),
    models.BlogPost.belongsToMany( models.Category, {
      as: 'category',
      through: PostsCategories,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    })
  }
    return PostsCategories;
  }
  
  module.exports = PostsCategoriesSchema; 