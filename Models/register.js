const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const registerSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    confirmPassword : {
        type : String,
        required : true,
    }
})

registerSchema.pre("save",async function(next){
    // if(this.isModified('password')){
    //const passwordHash = await bcrypt.hash(password,10);
    this.password = await bcrypt.hash(this.password, 10);
    console.log(`the current password is ${this.password}`)

    this.confirmPassword = undefined;    //to not save the confirm password 
    // }
    next();
})

const collectionRegister = new mongoose.model("Product5",registerSchema);    //collection name provided 
module.exports = collectionRegister ;