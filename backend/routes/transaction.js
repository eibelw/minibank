const express = require('express')
const router = express.Router()

const TransactionController = require('../controller/transactionController')

router.post('/create', TransactionController.create)
router.get('/list', TransactionController.getList)
router.get('/detail/:id', TransactionController.getDetails)

module.exports = router