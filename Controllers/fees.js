const collectionFee = require('../Models/feeDetails');


const postStudentFee = async(req,res)=>{
    try{
    const existingStudent = await collectionFee.findOne({stuId : req.body.stuId});
    //console.log(req.body.stuId)
    if(existingStudent){
        return res.status(404).json({
            success : false,
            message : "Student already exist",
        })
    }else{
        const newFeeDetail = await collectionFee.create(req.body)
        return res.status(200).json({
            success : true,
            message : "Fee details accepted successfully",
            newFeeDetail
        })
     }
}catch(err){
    console.error(err);
    return res.status(500).json({
        success : false,
        message : "Internal server error"
    })

}
}
/////////////////////////////////////////////////////////////////////////////update API
const updateStudentFee = async(req,res)=>{
    
    try{
    let availableUser = await collectionFee.findById(req.params.id);

    if(availableUser){
     availableUser = await collectionFee.findByIdAndUpdate(req.params.id,req.body,
        {new:true,
        useFindAndModify: false,
        runValidators: true
        })
      return res.status(200).json({
        success :true,
        availableUser,
        message : 'Fee details updated successfully'
    })

   }else {
        return res.status(404).json({
        success: false,
        message: 'This user is not present'
    })
   }
    }catch(err){
    console.error(err);
    return res.status(500).json({
        success : false,
        message : "Internal server error"
    })

}
}
////////////////////////////////////////////////////////////////////getAll fees
const getAllStudentFee = async(req,res)=>{
    const allStudentFee = await collectionFee.find();
    return res.status(200).json({
        success :true,
        allStudentFee
    })
}

//////////////////////////////////////////////////////////////////deleteFeeDetail

const deleteStudentFeeDetail = async(req,res) =>{
    try{
    let availableStudent = await collectionFee.findById(req.params.id);

    if(availableStudent){
        await collectionFee.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            success : true,
            message : "Student fee details deleted successfully"
        })
    }else{
        return res.status(404).json({
            success : false,
            message : "Student not found"
        })
    }

   }catch(err){
    console.error(err);
    return res.status(500).json({
        success: false,
        message: "Internal Server Error."
    });
  }
 }


module.exports = { postStudentFee,updateStudentFee,getAllStudentFee,deleteStudentFeeDetail  };