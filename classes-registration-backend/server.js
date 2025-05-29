// server.js

const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({path:'./config.env'})

const port = process.env.PORT;

console.log(port)

const DB = process.env.DATABASE.replace(
    '<db_password>',
    process.env.DATABASE_PASSWORD
)

//Connect to database
mongoose
.connect(DB)
.then(()=>{
    console.log('DB connection is OK')
})

app.listen(port, ()=>{
    console.log(`Server started on ${port}`)
})