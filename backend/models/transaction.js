"use strict";
const { Model } = require("sequelize");


module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Transaction.init(
    {
      transaction_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      amount: DataTypes.FLOAT,
      credit_account: DataTypes.INTEGER,
      debit_account: DataTypes.INTEGER,
      created_at: DataTypes.DATE(20),
    },
    {
      sequelize,
      modelName: "Transaction",
      tableName: "Transactions",
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    }
  );
  return Transaction;
};
