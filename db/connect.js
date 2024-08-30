const mongoose = require('mongoose');
require("dotenv").config();

const uri = process.env.DB_URL ;

                        

const connectDB = ()=>{
    return mongoose.connect(uri)
    .then(()=> console.log('Database connection done'))
    .catch((err)=> console.log(err))
}

module.exports = connectDB;