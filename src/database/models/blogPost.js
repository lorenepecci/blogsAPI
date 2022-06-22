const BlogPostsSchema = ( sequelize, dataTypes ) => {
  const BlogPosts = sequelize.define( "BlogPost", {
    id: { type: dataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: dataTypes.INTEGER, foreignKey: true },
    title: dataTypes.STRING(255),
    content: dataTypes.STRING(255),
    published: dataTypes.DATE,
    updated: dataTypes.DATE,
  }, {
    timestamps: false,
  } );

  BlogPosts.associate = (models) => {
    BlogPosts.belongsTo(models.User, {as: 'user', foreignKey: 'userId'});
  }

  return BlogPosts;
}

module.exports = BlogPostsSchema;