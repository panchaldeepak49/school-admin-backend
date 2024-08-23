const collectionLogin = require('../Models/login');
const collectionRegister = require('../Models/register');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = 'secretkey';

const postLogin = async(req,res) =>{
    const{ email,password } = req.body;
    // const existingUser = await collectionLogin.findOne({email: email});
    const existingUser = await collectionRegister.findOne({email: email});
     //console.log(existingUser);

     
    if(existingUser){
        // if(password === existingUser.password){
            const isMatch = await bcrypt.compare(password, existingUser.password);
            
            if(isMatch){
            const token = jwt.sign({ email: email }, secretKey);
            res.status(200).json({
                success : true,
                message : "Login successfull",
                token : token,
                details : existingUser
            })
        }else{
            res.status(400).json({
                success : false,
                message : "incorrect password"
            })
        }
    }else{
        res.status(404).json({
            success : false,
            message : " User not registered"
        })
    }
}

module.exports = { postLogin } ;