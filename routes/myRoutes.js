
const express = require('express');
const router = express.Router();

const { uploadFile,upload } = require('../Controllers/fileUpload');
const { postLogin } = require('../Controllers/login');
const { postAdmission,getAllAdmission,getAllAdmissionWithSearch
,getAllAdmissionWithSearchNpagination,deleteStudent,getAdmissionClassX,getAdmissionClassXSearch } = require('../Controllers/admission');
const { getAllMyAdmission } = require('../Controllers/practice');
const { postRegister } = require('../Controllers/register')
const { postStudentFee,updateStudentFee,getAllStudentFee,deleteStudentFeeDetail,getAllStudentFeeCollection } = require('../Controllers/fees')
const { postStaff,getAllStaff,getAllStaffWithSearch,updateStaff,deleteStaff,getAllStaffEmail,getParticularStaff } = require('../Controllers/staff')
const { sendMail } = require('../Controllers/sendMail');
const { postClass,getAllClass,getClassByClass,updateClass,deleteClass } = require('../Controllers/class');
//const { uploadFileCloud } = require('../Controllers/fileUploadCloud');


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
//router.route('/upload/cloud').post(uploadFileCloud);
router.route("/school/postAllStudentFee").post(postStudentFee);
router.route("/school/updateStudentFee/:id").put(updateStudentFee);
router.route('/school/getAllStudentFee').get(getAllStudentFee);
router.route('/school/deleteStudentFeeDetail/:id').delete(deleteStudentFeeDetail);

router.route('/school/postStaff').post(postStaff);
//router.route("/school/getAllStaff").get(getAllStaff);
router.route("/school/getAllStaff").get(getAllStaffWithSearch);
router.route('/school/getParticularStaff/:selectedStandard').get(getParticularStaff);
router.route("/school/updateStaff/:id").put(updateStaff);
router.route('/school/deleteStaffDetail/:id').delete(deleteStaff);
router.route('/school/sendMail').post(sendMail);
router.route('/school/getAllStaffEmail').get(getAllStaffEmail);
router.route('/school/getAllStudentFee/:class').get(getAllStudentFeeCollection);

router.route('/school/postClass').post(postClass);
router.route('/school/getClass').get(getAllClass);
router.route('/school/getClass/:class').get(getClassByClass);
router.route('/school/updateClass/:id').put(updateClass);
router.route('/school/deleteClass/:id').delete(deleteClass);

module.exports = router;
