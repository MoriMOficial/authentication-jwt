const router = require('express').Router()
const schema = require('../controller/accountController.js')

router.post("/register", (req, res) => {schema.register(req, res)})
router.post("/login", (req, res) => {schema.login(req, res)})


module.exports = router