"use strict";
const { Model } = require("sequelize");
const Transaction = require("./transaction");

module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Account.init(
    {
      account_no: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: DataTypes.STRING(50),
      balance: DataTypes.FLOAT,
      created_at: DataTypes.DATE(20),
    },
    {
      sequelize,
      modelName: "Account",
      tableName: "Accounts",
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    }
  );
  Account.associate = function (models) {
    Account.hasMany(models.Transaction, {
      sourceKey: "account_no",
      foreignKey: "credit_account",
    });
    Account.hasMany(models.Transaction, {
      sourceKey: "account_no",
      foreignKey: "debit_account",
    });
  };

  return Account;
};
