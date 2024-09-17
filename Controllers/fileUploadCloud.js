const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
require("dotenv").config();

// Configure Cloudinary with your credentials
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });

const uploadFileCloud = async(req,res)=>{
    try{
        //console.log('Incoming request files:', req.files);
        console.log(req.body)

    if (!req.files.file) {
        return res.status(400).json({
          success: false,
          message: 'No file uploaded',
        });
      }

    //    const file = `${req.file.filename}`
    const file = req.files.file;
    //console.log(file.tempFilePath)

    const uploadFromBuffer = (fileBuffer) => {
        return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    folder: 'uploads' // Optional: specify a folder in Cloudinary
                },
                (error, result) => {
                    if (result) {
                        resolve(result);
                    } else {
                        reject(error);
                    }
                }
            );
            streamifier.createReadStream(fileBuffer).pipe(stream);
        });
    };

    const result = await uploadFromBuffer(file.data);

       res.status(200).json({
        success: true,
        message: 'File uploaded successfully',
        url: result.secure_url,
    });

    }catch (error) {
        console.error('Error uploading file to Cloudinary:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to upload file',
        });
    }


    

}

module.exports = { uploadFileCloud  };