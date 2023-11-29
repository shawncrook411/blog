const router = require('express').Router()

const api = require('./api.js')

router.use('/', api)

module.exports = router