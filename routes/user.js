const router = require('express').Router()
const schema = require('../models/registerSchema.js')

router.get("/user/:id", schema.checkToken, (req, res) => {schema.user(req, res)})


module.exports = router