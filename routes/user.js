const express = require('express')
const router = express.Router()
const user = require('../controllers/user')

router.route('/').get(user.getAllUsers)

module.exports = router
