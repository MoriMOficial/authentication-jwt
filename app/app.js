const express = require('express')
const router = require('../routes/router.js')
const color = require('colors')
const app = express();

app.use(express.json())
app.use(router)

module.exports = app
