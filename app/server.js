const app = require('./app.js')
const conn = require('./database.js')
require('dotenv').config()

const PORT = process.env.PORT;

const logged = conn((value) => {
    if(value != true)  {
        console.log("Something goes wrong with the database".red)
        return;
    }
     app.listen(PORT, console.log(`!Logged on ${PORT}!`.yellow));
})

