const express = require('express')
const router = express.Router()

const AccountController = require('./account')
const TransactionController = require('./transaction')

router.use('/account', AccountController)
router.use('/transaction', TransactionController)

module.exports = router