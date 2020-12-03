'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      'orders',
      [
        {
          user: 'Abdi Faishal',
          dishId: 2,
          orderQuantity: 1,
          specialRequest: 'Sambelnya yg banyak',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user: 'Eva Ginting',
          dishId: 2,
          orderQuantity: 1,
          specialRequest: 'Kuahnya dipisah',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('orders', null, {});
  },
};
