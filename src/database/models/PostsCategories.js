
const PostsCategoriesSchema = ( sequelize, dataTypes ) => {
  const PostsCategories = sequelize.define( "PostCategorie", {}, { timestamps: false } );
  PostsCategories.associate = ( models ) => {
    models.Categorie.belongsToMany( models.BlogPost, {
      as: 'blogpost',
      through: PostsCategories,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    } ),
    models.BlogPost.belongsToMany( models.Categorie, {
      as: 'categorie',
      through: PostsCategories,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    })
  }
    return PostsCategories;
  }
  
  module.exports = PostsCategoriesSchema;