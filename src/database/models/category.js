const CategoriesSchema = ( sequelize, dataTypes ) => {
  const Categories = sequelize.define( "Category", {
    id:{ type: dataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
    name: dataTypes.STRING(255),
  }, {
    timestamps: false,
  } );

  return Categories;
}

module.exports = CategoriesSchema;