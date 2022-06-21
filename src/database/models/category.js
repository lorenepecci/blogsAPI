const CategoriesSchema = ( sequelize, dataTypes ) => {
  const Categories = sequelize.define( "Category", {
    id:{ type: dataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
    name: dataTypes.STRING(255),
  }, {
    timestamps: false,
  } );

  Categories.associate = (models) => {
    Categories.hasMany(models.PostCategory, {as: 'postcategory', foreignKey: 'categoryId'});
  }

  return Categories;
}

module.exports = CategoriesSchema;