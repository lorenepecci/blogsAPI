const PostsCategoriesSchema = ( sequelize, dataTypes ) => {
  const PostCategory = sequelize.define( "PostCategory",  {
    postId: {
      type: dataTypes.INTEGER,
      foreignKey: true,
    },
    categoryId: {
      type: dataTypes.INTEGER,
      foreignKey: true,
    }
  }, { timestamps: false } );
  PostCategory.associate = ( models ) => {
    models.Category.belongsToMany( models.BlogPost, {
      as: 'blogpost',
      through: PostCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    } ),
    models.BlogPost.belongsToMany( models.Category, {
      as: 'category',
      through: PostCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    })
  }
    return PostCategory;
  }
  
  module.exports = PostsCategoriesSchema; 