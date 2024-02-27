const uploadFile = async(req,res)=>{
    //const product = await upload.single('document');
    //console.log(req.file);
    if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No file uploaded',
        });
      }

    // const uploadedFileUrl = `/uploads/${req.file?.filename}`;
    const uploadedFileUrl = `http://localhost:5000/profile/${req.file?.filename}`;

    res.status(200).json({ 
        success: true,
        message: 'File uploaded successfully',
        url: uploadedFileUrl,
        
        //product
    });
  }

  module.exports = { uploadFile };