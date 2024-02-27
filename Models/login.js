const mongoose = require ('mongoose');
const loginSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    }
})

const collectionLogin = new mongoose.model("Product4",loginSchema);    //collection name provided 
module.exports = collectionLogin ;