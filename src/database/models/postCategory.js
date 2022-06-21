const PostsCategoriesSchema = ( sequelize, dataTypes ) => {
  const PostCategory = sequelize.define( "PostCategory", {
    postId: {
      type: dataTypes.INTEGER, 
    
    },
    categoryId: {
      type: dataTypes.INTEGER,
    
    }
  }, { timestamps: false, tableName: 'PostCategories' } );
  PostCategory.associate = ( models ) => {
    models.Category.belongsToMany( models.BlogPost, {
      as: 'blogpost',
      through: PostCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    } ),
    models.BlogPost.belongsToMany( models.Category, {
      as: 'categories',
      through: PostCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    })
  }
    return PostCategory;
  }
  
  module.exports = PostsCategoriesSchema; 