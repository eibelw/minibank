'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Accounts", {
      account_no: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        // references: {
        //   model: "Transaction",
        //   key: ["debit_account", "credit_account"]
        // }
      },
      name: {
        type: Sequelize.STRING(50),
      },
      balance: {
        type: Sequelize.FLOAT,
      },
      created_at: {
        type: Sequelize.DATE(20),
        defaultValue: Sequelize.NOW
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Accounts", {});
  },
};
