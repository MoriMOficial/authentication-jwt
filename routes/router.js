const router = require('express').Router()
const testRoute = require('./test.js')

router.use("/test", testRoute)

module.exports = router