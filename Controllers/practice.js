const collectionAdmission = require("../Models/admission")


const getAllMyAdmission = async(req,res) =>{
   //const result = await collectionAdmission.find({name : 'ankit'});
   const result = await collectionAdmission.find().sort({name : -1});
   //.select({name : 2,fatherName : 2,section: 2});
   return res.status(200).json({
    success : true,
    message : "required details fetched",
    result
   })
}

module.exports = { getAllMyAdmission };