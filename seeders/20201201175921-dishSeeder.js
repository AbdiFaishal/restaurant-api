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
      'dishes',
      [
        {
          name: 'Sichuan Pork',
          price: 11.99,
          vendorId: 2,
          tagId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Bubur Ayam',
          price: 2.5,
          vendorId: 2,
          tagId: 4,
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
    await queryInterface.bulkDelete('dishes', null, {});
  },
};
