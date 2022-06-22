'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable( 'Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      displayName: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      image: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
    } );
  },

  down: async (queryInterface, _Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};
