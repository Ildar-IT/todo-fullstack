'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    return queryInterface.addColumn('users', 'name', {
      type: Sequelize.STRING,
      defaultValue: 'ПИНГВИН',
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn('users', 'name');
  },
};
