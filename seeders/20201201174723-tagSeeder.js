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
      'tags',
      [
        {
          name: 'chinese',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'western',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'korean',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'indonesian',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'beverages',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'halal',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'lunch',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'dinner',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'breakfast',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'fish',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'meat',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'budget',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'affordable',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'expensive',
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
    await queryInterface.bulkDelete('tags', null, {});
  },
};
