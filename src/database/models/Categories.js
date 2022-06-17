const CategoriesSchema = ( sequelize, dataTypes ) => {
  const Categories = sequelize.define( "Categorie", {
    id:{ type: dataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
    name: dataTypes.STRING(255),
  }, {
    timestamps: false,
  } );

  Categories.associate = (models) => {
    Categories.hasMany(models.PostCategorie, {as: 'postcategorie', foreignKey: 'categoryId'});
  }

  return Categories;
}

module.exports = CategoriesSchema;