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
const { postStudentFee,updateStudentFee,getAllStudentFee,deleteStudentFeeDetail,getAllStudentFeeCollection } = require('../Controllers/fees')
const { postStaff,getAllStaff,getAllStaffWithSearch,updateStaff,deleteStaff,getAllStaffEmail } = require('../Controllers/staff')
const { sendMail } = require('../Controllers/sendMail')


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
router.route("/school/postAllStudentFee").post(postStudentFee);
router.route("/school/updateStudentFee/:id").put(updateStudentFee);
router.route('/school/getAllStudentFee').get(getAllStudentFee);
router.route('/school/deleteStudentFeeDetail/:id').delete(deleteStudentFeeDetail);

router.route('/school/postStaff').post(postStaff);
// router.route("/school/getAllStaff").get(getAllStaff);
router.route("/school/getAllStaff").get(getAllStaffWithSearch);
router.route("/school/updateStaff/:id").put(updateStaff);
router.route('/school/deleteStaffDetail/:id').delete(deleteStaff);
router.route('/school/sendMail').post(sendMail);
router.route('/school/getAllStaffEmail').get(getAllStaffEmail);
router.route('/school/getAllStudentFee/:class').get(getAllStudentFeeCollection);

module.exports = router;
