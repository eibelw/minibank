"use strict";

const { UUIDV4 } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Transactions", {
      transaction_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: UUIDV4,
      },
      amount: {
        type: Sequelize.FLOAT,
      },
      credit_account: {
        type: Sequelize.INTEGER,
        references: {
          model: "Accounts",
          key: "account_no",
        },
      },
      debit_account: {
        type: Sequelize.INTEGER,
        references: {
          model: "Accounts",
          key: "account_no",
        },
      },
      created_at: {
        type: Sequelize.DATE(20),
        defaultValue: Sequelize.NOW,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Transactions");
  },
};
