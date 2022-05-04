'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Comments", [
      {
        userId: 2,
        photoId: 1,
        comment: "This is SICK!!",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        photoId: 1,
        comment: "Is this real or just a render?",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ])
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Comments", null, {})
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
