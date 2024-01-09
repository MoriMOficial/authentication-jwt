const router = require('express').Router()
const schema = require('../controller/accountController.js')

router.get("/user/:id", schema.checkToken, (req, res) => {schema.user(req, res)})


module.exports = router