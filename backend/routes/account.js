const express = require('express')
const router = express.Router()

const AccountController = require('../controller/accountController')

router.post('/create', AccountController.create)
router.get('/list', AccountController.getList)
router.get("/detail/:id", AccountController.getDetail);
router.get('/list/no', AccountController.listAccount)

module.exports = router