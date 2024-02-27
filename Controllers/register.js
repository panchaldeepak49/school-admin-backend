const collectionRegister = require('../Models/register');

const postRegister = async(req,res)=>{
    const {name,email,password,confirmPassword} = req.body;
    const existingUser = await collectionRegister.findOne({email: email});
    
    if(!existingUser){
        if(password === confirmPassword){
            const newUser = await collectionRegister.create(req.body);
        return res.status(201).json({
                success : true,
                message : 'User registered successfully',
                newUser
            })
        }
        else{
            return res.status(400).json({
                success: false,
                message : "Password are not same"
            })

        }
          
    }else{
        return res.status(400).json({
            success : false,
            message : 'User already registered'
        })
    }
}

module.exports = { postRegister } ;