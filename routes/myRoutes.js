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




const express = require('express');
const router = express.Router();

const {uploadFile} = require('../Controllers/fileUpload');
const { postLogin } = require('../Controllers/login');
const { postAdmission,getAllAdmission,getAllAdmissionWithSearch
,getAllAdmissionWithSearchNpagination,deleteStudent,getAdmissionClassX,getAdmissionClassXSearch } = require('../Controllers/admission');
const { getAllMyAdmission } = require('../Controllers/practice');
const { postRegister } = require('../Controllers/register')

router.route("/school/register").post(postRegister);
router.route("/school/login").post(postLogin);
router.route("/school/postAdmission").post(postAdmission);
router.route("/school/getAllAdmission").get(getAllAdmission);
router.route("/school/getAllAdmission/searchFilter").get(getAllAdmissionWithSearch);
router.route("/school/getAllAdmission/searchFilterN").get(getAllAdmissionWithSearchNpagination);
router.route("/school/practice/getReqData").get(getAllMyAdmission);
router.route("/school/deleteStudent/:id").delete(deleteStudent);
//router.route("/school/getAdmissionX").get(getAdmissionClassX);
router.route("/school/getAdmissionX").get(getAdmissionClassXSearch);
router.route('/upload').post(upload.single('file'),uploadFile);  //this api is used in frontend action 


module.exports = router;
