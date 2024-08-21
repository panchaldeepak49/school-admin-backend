const collectionAdmission = require('../Models/admission');

const postAdmission = async(req,res)=>{
    try{
    const existingStudent = await collectionAdmission.findOne({contact : req.body.contact});

    if(existingStudent){
        return res.status(404).json({
            success : false,
            message : "Student already exist",
        })
    }else{
        const newAdmission = await collectionAdmission.create(req.body)
        return res.status(200).json({
            success : true,
            message : "Admission accepted successfully",
            newAdmission
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
///////////////////////////////////////////////////////////////////////////////

const getAllAdmission = async(req,res)=>{
    const allAdmission = await collectionAdmission.find();
    return res.status(200).json({
        success :true,
        allAdmission
    })
}

//////////////////////////////////////////////////////////////////////////search in getAPI 
const getAllAdmissionWithSearch = async(req,res)=>{
    try{
    let search = '';
    if(req.query.search){
        search = req.query.search;
    }
    const allAdmission = await collectionAdmission.find({
        $or : [
            {name : { $regex:'.*'+ search +'.*', $options:'i' } }
        ]
    });
    return res.status(200).json({
        success : true,
        allAdmission
    })
   }catch(err){
    return res.status(500).json({
        success : false,
        message : err.message
    })
   }
}
/////////////////////////////////////////////////////////

const getAdmissionClassX = async(req,res)=>{
    const xAdmission = await collectionAdmission.find({class : 'X'});
    return res.status(200).json({
        success : true,
        message : " Class x students fetched successfully",
        xAdmission
    })
}

// const getAdmissionClassXSearch = async(req,res)=>{
//     try{
//     let search = '';
//     if(req.query.search){
//         search = req.query.search;
//     }
//     const xAdmission = await collectionAdmission.find({
//         $and : [
//             {class : 'X'},
//             {name : { $regex:'.*'+ search +'.*', $options:'i' } }
//         ]
//     });
//     return res.status(200).json({
//         success : true,
//         message : " Class x students fetched successfully",
//         xAdmission
//     })
// }catch(err){
//     return res.status(500).json({
//         success : false,
//         message : err.message
//     })
// }
// }


const getAdmissionClassXSearch = async(req,res)=>{
    try{
    let search = '';
    if(req.query.search){
        search = req.query.search;
    }
    const xAdmission = await collectionAdmission.find({
        $and : [
            {class : req.query.class },
            {name : { $regex:'.*'+ search +'.*', $options:'i' } }
        ]
    });
    return res.status(200).json({
        success : true,
        message : " Class x students fetched successfully",
        xAdmission
    })
}catch(err){
    return res.status(500).json({
        success : false,
        message : err.message
    })
}
}


//router.route("/school/getAllAdmission/searchFilterN").get(getAllAdmissionWithSearchNpagination);
//http://localhost:5000/api/school/getAllAdmission/searchFilterN?search=&limit=&page=
//////////////////////////////////////////////////////////////////////////search&pagination in getAPI 
const getAllAdmissionWithSearchNpagination = async(req,res)=>{
    try{
    var limit = 2;
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

    const allAdmission = await collectionAdmission.find({
        $or : [
            {name : { $regex:'.*'+ search +'.*', $options:'i' } }
        ]
    })
    .limit(limit * 1)
    .skip((page - 1)*limit)
    .exec();
    
    const count = await collectionAdmission.find().countDocuments();
    return res.status(200).json({
        success : true,
        allAdmission,
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

//////////////////////////////////////////////////////////delete all admissions

const deleteStudent = async(req,res) =>{
    try{
    let availableStudent = await collectionAdmission.findById(req.params.id);

    if(availableStudent){
        await collectionAdmission.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            success : true,
            message : "Student deleted successfully"
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


module.exports = { postAdmission,getAllAdmission,getAllAdmissionWithSearch,getAllAdmissionWithSearchNpagination,
    deleteStudent,getAdmissionClassX,getAdmissionClassXSearch };
