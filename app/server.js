import { app } from './app.js';
require('dotenv').config();

const PORT = process.env.PORT;

app.listen(PORT, console.log(`Logged on ${PORT}`));