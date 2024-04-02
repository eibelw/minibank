
const { Account } = require("../models");
const AccountController = {
  create: async (req, res) => {
    const { name, balance } = req.body;

    try {
      if (name.length > 50) {
        return res.status(405).json("Name cannot be longer than 50 characters");
      }

      if (balance > 99999999) {
        return res.status(405).json("Balance cannot be more than 99 million");
      }
      const accounts = await Account.create({
        name,
        balance,
        created_at: new Date(),
      });

      console.log("Created a new account: ", accounts.dataValues);
      res.status(201).json(accounts);
    } catch (err) {
      console.error({ err: err.message });
      res
        .status(500)
        .json("Failed to get create a new account: Internal Server Error");
    }
  },

  getList: async (req, res) => {
    try {
      const accounts = await Account.findAll({
        attributes: ["account_no", "name"],
      });

      if (accounts.length === 0) {
        return res
          .status(404)
          .json({ message: "No accounts found in database" });
      }

      console.log("Getting account list...");
      res.status(200).json(accounts);
    } catch (err) {
      console.error({ err: err.message });
      res
        .status(500)
        .json({ message: "Failed to get list: Internal Server error" });
    }
  },

  getDetail: async (req, res) => {
    const { id } = req.params;
    try {
      const accounts = await Account.findOne({
        where: { account_no: parseInt(id) },
      });

      if (!accounts) {
        return res.status(404).json("No account found in database");
      }

      console.log("Getting account details...", accounts.dataValues);
      res.status(200).json({ accounts });
    } catch (err) {
      console.error({ err: err.message });
      res.status(500).json("Failed to get list: Internal Server Error");
    }
  },

  listAccount: async (req, res) => {
    try {
      const accounts = await Account.findAll({
        attributes: ["account_no"],
      });

      if (!accounts) {
        return res.status(404).json("No accounts found in the database ");
      }

      console.log("Getting list accounts...");
      res.status(200).json(accounts);
    } catch (err) {
      console.error({ err: err.message });
      res.status(500).json("Failed to get list: Internal Server Error");
    }
  },
};

module.exports = AccountController;
