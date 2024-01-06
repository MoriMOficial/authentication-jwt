const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = require('../routes/router.js')
const color = require('colors')
const app = express();

app.use(router)

module.exports = app
