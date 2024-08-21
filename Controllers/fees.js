const collectionFee = require('../Models/feeDetails');


const postStudentFee = async(req,res)=>{
    try{
    const existingStudent = await collectionFee.findOne({stuId : req.body.stuId});
    //console.log(req.body.stuId)
    if(existingStudent){
        return res.status(404).json({
            success : false,
            message : "Student already exist G",
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
// const getAllStudentFee = async(req,res)=>{
//     const allStudentFee = await collectionFee.find();
//     return res.status(200).json({
//         success :true,
//         allStudentFee
//     })
// }
///////////////////////////////////////////////////////////////////////
const getAllStudentFee = async(req,res)=>{
    try{
    var limit = 8;
    if(req.query.limit){
        limit = req.query.limit;
    }

    var page = 1;
    if(req.query.page){
        page = req.query.page;
    }

    let search = '';
    if(req.query.search){
        search = req.query.search;
    }

    // const allStudentFee = await collectionFee.find({
    //     $or : [
    //         {name : { $regex:'.*'+ search +'.*', $options:'i' } }
    //     ]
    // })
    // .limit(limit * 1)
    // .skip((page - 1)*limit)
    // .exec();

    const allStudentFee = await collectionFee.find({
        $and : [
            {class : req.query.class },
            {name : { $regex:'.*'+ search +'.*', $options:'i' } }
        ]
    })
    .limit(limit * 1)
    .skip((page - 1)*limit)
    .exec();
    
    const count = await collectionFee.find().countDocuments();
    return res.status(200).json({
        success : true,
        allStudentFee,
        limit : limit,
        page : page,
        count : count,
        totalPages : Math.ceil(count/limit),
    })
   }catch(err){
    return res.status(500).json({
        success : false,
        message : err.message
    })
   }
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

//////////////////////////////////////////////////////////////////////////////

const getAllStudentFeeCollection = async(req,res)=>{
    const allStudentFee = await collectionFee.find({class : req.params.class});
    // const allStudentFee = await collectionFee.find();

    const janFeeArray = allStudentFee.map(fee => fee.january)
    const janFeeCollection = janFeeArray.reduce((val1,val2)=>{
        return val1+val2
    })
    const febFeeArray = allStudentFee.map(fee => fee.february)
    const febFeeCollection = febFeeArray.reduce((val1,val2)=>{
        return val1+val2
    })
    const marchFeeArray = allStudentFee.map(fee => fee.march)
    const marchFeeCollection = marchFeeArray.reduce((val1,val2)=>{
        return val1+val2
    })
    const aprilFeeArray = allStudentFee.map(fee => fee.april)
    const aprilFeeCollection = aprilFeeArray.reduce((val1,val2)=>{
        return val1+val2
    })
    const mayFeeArray = allStudentFee.map(fee => fee.may)
    const mayFeeCollection  = mayFeeArray.reduce((val1,val2)=>{
        return val1+val2
    })
    const juneFeeArray = allStudentFee.map(fee => fee.june)
    const juneFeeCollection  = juneFeeArray.reduce((val1,val2)=>{
        return val1+val2
    })
    const julyFeeArray = allStudentFee.map(fee => fee.july)
    const julyFeeCollection  = julyFeeArray.reduce((val1,val2)=>{
        return val1+val2
    })
    const augustFeeArray = allStudentFee.map(fee => fee.august)
    const augustFeeCollection  = augustFeeArray.reduce((val1,val2)=>{
        return val1+val2
    })
    const septemberFeeArray = allStudentFee.map(fee => fee.september)
    const septemberFeeCollection  = septemberFeeArray.reduce((val1,val2)=>{
        return val1+val2
    })
    const octoberFeeArray = allStudentFee.map(fee => fee.october)
    const octoberFeeCollection  = octoberFeeArray.reduce((val1,val2)=>{
        return val1+val2
    })
    const novemberFeeArray = allStudentFee.map(fee => fee.november)
    const novemberFeeCollection  = novemberFeeArray.reduce((val1,val2)=>{
        return val1+val2
    })
    const decemberFeeArray = allStudentFee.map(fee => fee.december)
    const decemberFeeCollection  = decemberFeeArray.reduce((val1,val2)=>{
        return val1+val2
    })

    return res.status(200).json({
        success :true,
        janFeeCollection,
        febFeeCollection,
        marchFeeCollection,
        aprilFeeCollection,
        mayFeeCollection,
        juneFeeCollection,
        julyFeeCollection,
        augustFeeCollection,
        septemberFeeCollection,
        octoberFeeCollection,
        novemberFeeCollection,
        decemberFeeCollection
    })
}

module.exports = { postStudentFee,updateStudentFee,getAllStudentFee,deleteStudentFeeDetail,getAllStudentFeeCollection };