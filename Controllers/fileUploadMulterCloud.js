 //Applying multer with cloudinary 
 const multer = require('multer');
 const cloudinary = require('cloudinary').v2;
 const { Readable } = require('stream');

//Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: 'dcorxvue7',
  api_key: '897132727325465',
  api_secret: '0SigtzCvaG0fHqilXD3glNLEyfA'
});

// const storage = new MulterCloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'Uploads/Images',  // Specify a folder in Cloudinary
//     allowed_formats: ['jpg', 'jpeg', 'png', 'gif'], // Allowed file formats
//     // Optionally, you can include transformations here
//     public_id: (req, file) => Date.now() + '-' + file.originalname,
//   },
// });

// const upload = multer({ storage });

const upload = multer({ storage: multer.memoryStorage() });

function uploadToCloudinary(buffer, folder) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: folder },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    Readable.from(buffer).pipe(stream);
  });
}

const uploadFileCloud1 = async (req, res) => {
    //console.log(req.file)
    try {
      const result = await uploadToCloudinary(req.file.buffer, 'uploads');
      res.json({
        success : true,
        message: 'File uploaded successfully!',
        url : result.secure_url,
      });
    } catch (error) {
        console.error(error);
      res.status(500).json({ message: 'File upload failed', error });
    }
  };

  module.exports = { uploadFileCloud1, upload };

