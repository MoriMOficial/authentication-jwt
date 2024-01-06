const mongoose = require('mongoose')
require('dotenv').config()

const dbUser = encodeURIComponent(process.env.DBUSER)
const dbPass = encodeURIComponent(process.env.DBPSSW)
const dbcluster = encodeURIComponent(process.env.DBCLUSTER)

function conn(cb) {
    mongoose
        .connect(`mongodb+srv://${dbUser}:${dbPass}@${dbcluster}.v8quyww.mongodb.net/?retryWrites=true&w=majority`)
        .then(() => {
            return cb(true)
        })
        .catch((err) => {
            console.log(`${err}`.red)
            return cb(false)
        })
}

module.exports = conn