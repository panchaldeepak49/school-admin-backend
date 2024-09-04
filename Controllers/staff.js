const collectionStaff = require('../Models/staff');


const postStaff = async(req,res)=>{
    try{
    const existingStaff = await collectionStaff.findOne({contact : req.body.contact});
    const classAlreadyAssigned = await collectionStaff.findOne({
      classAssigned: { $ne: "", $eq: req.body.classAssigned }    // Exclude empty classAssigned values
     });
    //console.log(req.body)

    if(existingStaff){
        return res.status(404).json({
            success : false,
            message : "Staff already exist",
        })
        }else if(classAlreadyAssigned){
            return res.status(404).json({
                success : false,
                message : "Class already assigned",
            })
    }else{
        const newStaff = await collectionStaff.create(req.body)
        //console.log(req.body)
        return res.status(200).json({
            success : true,
            message : "Staff accepted successfully",
            newStaff
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

const getAllStaff = async(req,res)=>{
    const allStaff = await collectionStaff.find();
    return res.status(200).json({
        success :true,
        allStaff
    })
}
//////////////////////////////////////////////////////////////////////////search in getAPI 
const getAllStaffWithSearch = async(req,res)=>{
    try{
    let search = '';
    if(req.query.search){
        search = req.query.search;
    }
    const allStaff = await collectionStaff.find({
        $or : [
            {name : { $regex:'.*'+ search +'.*', $options:'i' } }
        ]
    });
    return res.status(200).json({
        success : true,
        allStaff
    })
   }catch(err){
    return res.status(500).json({
        success : false,
        message : err.message
    })
   }
}
/////////////////////////////////////////////////////////////////////////////update API
const updateStaff = async(req,res)=>{
    try{
    let availableUser = await collectionStaff.findById(req.params.id);
    // const classAlreadyAssigned = await collectionStaff.findOne({
    //     classAssigned: { $ne: "", $eq: req.body.classAssigned, $ne: availableUser.classAssigned }    // Exclude empty classAssigned values
    // });
    const classAlreadyAssigned = await collectionStaff.findOne({
        $and: [
            { classAssigned: { $ne: "" } },  // Exclude empty classAssigned values
            { classAssigned: { $eq: req.body.classAssigned } },  // Match the classAssigned value from the request
            { classAssigned: { $ne: availableUser.classAssigned } }  // Exclude the current user's classAssigned
        ]
    });

     if(availableUser){
        if(classAlreadyAssigned){
            return res.status(404).json({
                success : false,
                message : "Class already assigned",
            })
        }
      updatedUser = await collectionStaff.findByIdAndUpdate(req.params.id,req.body,
        {new:true,
        useFindAndModify: false,
        runValidators: true
        })
      return res.status(200).json({
        success :true,
        updatedUser,
        message : 'Staff details updated successfully'
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
  }}
//////////////////////////////////////////////////////////////////delete Staff

const deleteStaff = async(req,res) =>{
    try{
    let availableStaff = await collectionStaff.findById(req.params.id);

    if(availableStaff){
        await collectionStaff.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            success : true,
            message : "Staff details deleted successfully"
        })
    }else{
        return res.status(404).json({
            success : false,
            message : "Staff not found"
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

 ////////////////////////////////////////////////////////////////////////////////
 const getAllStaffEmail = async(req,res)=>{
    try{
    const allStaff = await collectionStaff.find();

    const emailArray = allStaff.map(staff => staff.email)

    return res.status(200).json({
        success :true,
        emailArray
    })
   }catch(error){
    return res.status(500).json({
        success : false,
        message : "Failed to fetch staff emails",
        error : error.message
    })
}
}
////////////////////////////////////////////////////////////////////////////////////

const getParticularStaff = async(req,res)=>{
    //console.log(req.params.selectedStandard)
    const particularStaff = await collectionStaff.findOne({
        classAssigned: { $ne: "", $eq: req.params.selectedStandard }    // Exclude empty classAssigned values
    });
    return res.status(200).json({
        success :true,
        message : "Staff details fetched",
        particularStaff
    })
}
 

module.exports = { postStaff,getAllStaff,getAllStaffWithSearch,updateStaff,deleteStaff,getAllStaffEmail,getParticularStaff }