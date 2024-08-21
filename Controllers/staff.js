const collectionStaff = require('../Models/staff');


const postStaff = async(req,res)=>{
    try{
    const existingStaff = await collectionStaff.findOne({contact : req.body.contact});
    //console.log(req.body)

    if(existingStaff){
        return res.status(404).json({
            success : false,
            message : "Staff already exist",
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

    if(availableUser){
     availableUser = await collectionStaff.findByIdAndUpdate(req.params.id,req.body,
        {new:true,
        useFindAndModify: false,
        runValidators: true
        })
      return res.status(200).json({
        success :true,
        availableUser,
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

}
}
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
 

module.exports = { postStaff,getAllStaff,getAllStaffWithSearch,updateStaff,deleteStaff,getAllStaffEmail }