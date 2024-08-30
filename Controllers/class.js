const collectionClass = require('../Models/class');


const postClass = async(req,res)=>{
   try{
    const existingClass = await collectionClass.findOne({class : req.body.class})

    if(existingClass){
        return res.status(404).json({
            success : false,
            message : 'Class already exist',

        })
    }
    const newClass = await collectionClass.create(req.body)
    return res.status(200).json({
        success : true,
        message : 'Class creation success',
        newClass
    })

   }catch(err){
    console.error(err)
      return res.status(500).json({
        success : false,
        message : 'Internal server error'
      })
   }
}

//////////////////////////////////////////////////////////////////////////////////////////

const getAllClass =async(req,res)=>{
        const allClass = await collectionClass.find();
        return res.status(200).json({
            success : true,
            message : 'Class fetched successfully',
            allClass
        })
}

const getClassByClass =async(req,res)=>{
    const myClass = await collectionClass.findOne({class : req.params.class});
    if(myClass){
    return res.status(200).json({
        success : true,
        message : 'Class fetched successfully',
        myClass
    })
  }else{
    return res.status(404).json({
        success : false,
        message : 'Class not found',
  })
}}

/////////////////////////////////////////////////////////////////////////////////
const updateClass = async(req,res)=>{

    let availableClass = await collectionClass.findById(req.params.id);
    if(availableClass){
        availableClass = await collectionClass.findByIdAndUpdate(req.params.id,req.body,
            {new:true,
            useFindAndModify: false,
            runValidators: true
            })
          return res.status(200).json({
            success :true,
            availableClass,
            message : 'Class details updated successfully'
        })
    }

}
///////////////////////////////////////////////////////////////////////
 const deleteClass = async(req,res)=>{
    try{
    let availableClass = await collectionClass.findById(req.params.id);
    if(availableClass){
        await collectionClass.findByIdAndDelete(req.params.id)
        return res.status(200).json({
            success : true,
            message : 'Class deleted successfully',

        })
    }else{
        return res.status(404).json({
            success : false,
            message : 'class not found'
        })
    }
    }catch(err){
        return res.status(500).json({
            success : false,
            message : 'Internal server error'
        })

    }}

module.exports = { postClass,getAllClass,getClassByClass,updateClass,deleteClass }