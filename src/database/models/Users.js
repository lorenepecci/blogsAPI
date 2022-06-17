const UsersSchema = ( sequelize, dataTypes ) => {
  const Users = sequelize.define( "User", {
    id:{ type: dataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
    displayName: dataTypes.STRING(255),
    password: dataTypes.STRING(255),
    email: dataTypes.STRING(255),
    image: dataTypes.STRING(255),
  }, {
    timestamps: false,
  } );

  Users.associate = (models) => {
    Users.hasMany(models.BlogPost, {as: 'blogpost', foreignKey: 'userId'});
  }

  return Users;
}

module.exports = UsersSchema;