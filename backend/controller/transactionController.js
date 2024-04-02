const { Account, Transaction } = require('../models');
const { v4: uuidv4 } = require('uuid');

const TransactionController = {
  create: async (req, res) => {
    const { credit_account, debit_account, amount } = req.body;

    const creditAccount = await Account.findOne({
      where: { account_no: credit_account },
    });
    const debitAccount = await Account.findOne({
      where: { account_no: debit_account },
    });

    const newBalanceCredit = creditAccount.balance + parseFloat(amount);
    const newBalanceDebit = debitAccount.balance - parseFloat(amount);

    //Checking balance
    if (newBalanceDebit <= 0) {
      return res.status(400).json('Balance is not enough');
    }

    await Account.update(
      { balance: newBalanceCredit },
      { where: { account_no: credit_account } }
    );
    await Account.update(
      { balance: newBalanceDebit },
      { where: { account_no: debit_account } }
    );

    //Checking Account
    if (!creditAccount) {
      return res.status(405).json('Credit account not found');
    }
    if (!debitAccount) {
      return res.status(405).json('Debit account not found');
    }

    const generatedUUID = uuidv4();

    try {
      const transaction = await Transaction.create({
        transaction_id: generatedUUID,
        amount,
        credit_account,
        debit_account,
        created_at: new Date(),
      });

      console.log(
        'New transaction is being processed: ',
        transaction.dataValues
      );
      res.status(200).json(transaction);
    } catch (err) {
      console.error({ err: err.message });
      res.status(500).json('Transaction failed: Internal Server Error');
    }
  },

  getList: async (req, res) => {
    try {
      const transaction = await Transaction.findAll({
        attributes: ['amount', 'created_at'],
      });
      console.log('Searching for list of transactions...');
      res.status(200).json(transaction);
    } catch (err) {
      console.error({ err: err.message });
      res.status(500).json('Failed to get list: Internal Server Error');
    }
  },

  getDetails: async (req, res) => {
    const { id } = req.params;
    try {
      const transaction = await Transaction.findOne({
        where: { created_at: id },
      });

      console.log('Getting all transactions details...');
      res.status(200).json(transaction);
    } catch (err) {
      console.error({ err: err.message });
      res.status(500).json('Failed to get list: Internal Server Error');
    }
  },
};

module.exports = TransactionController;
