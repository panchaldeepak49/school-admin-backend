const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/Images');      // Uploads will be stored in the 'uploads' directory
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);     // Rename the file to include the current timestamp
    },
  });

  const upload = multer({ storage });




const uploadFile = async(req,res)=>{
    
    //console.log(req.file);
    if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No file uploaded',
        });
      }

    // const uploadedFileUrl = `/uploads/${req.file?.filename}`;
     const uploadedFileUrl = `http://localhost:5000/profile/${req.file?.filename}`;
    //const uploadedFileUrl = `https://school-admin-backend.onrender.com/profile/${req.file?.filename}`;

    res.status(200).json({ 
        success: true,
        message: 'File uploaded successfully',
        url: uploadedFileUrl,
        
       
    });
  }

  module.exports = { uploadFile,upload };