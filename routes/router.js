const router = require('express').Router()
const registerRoute = require('./registerRoute.js')
const userRoute = require('./userRoute.js')

router.use("/auth", registerRoute)
router.use("/", userRoute)

module.exports = router