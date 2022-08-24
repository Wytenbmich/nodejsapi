require('dotenv').config();

//Start server
const startServer = require('./src/config/server');
const PORT = 3010;
const app = startServer();

//Start database
const connectToDb = require('./src/config/database');
const database_url = process.env.DATABASE_URL_PRODUCTION;

connectToDb(database_url);

app.listen(PORT, () => console.log("Server started"));