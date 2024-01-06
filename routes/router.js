const router = require('express').Router()
const registerRoute = require('./register.js')
const userRoute = require('./user.js')

router.use("/auth", registerRoute)
router.use("/", userRoute)

module.exports = router