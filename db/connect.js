const mongoose = require('mongoose');

const uri = 'mongodb+srv://panchaldeepak49:Deepak%4012345@cluster1.ebo66nu.mongodb.net/';
                        //database name provided(cluster1)---Mongodb atlas cloud service used here
                        

const connectDB = ()=>{
    return mongoose.connect(uri)
    .then(()=> console.log('Database connection done'))
    .catch((err)=> console.log(err))
}

module.exports = connectDB;