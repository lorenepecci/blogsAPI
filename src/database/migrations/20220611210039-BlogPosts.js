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
      userId: {
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      published: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    } );
  },

  down: async (queryInterface, _Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};
