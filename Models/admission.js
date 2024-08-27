const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    fatherName : {
        type : String,
        required : true,
    },
    class : {
        type : String,
        required : true,
    },
    rollNo : {
        type : Number,
        required : true,
    },
    address : {
        type : String,
        required : true,
    },
    admissionDate : {
        type : String,
        required : true,
    },
    // section : {
    //     type : String,
    //     required : true,
    // },
    // classTeacher : {
    //     type : String,
    //     required : true,
    // },
    gender : {
        type : String,
        required : true,
    },
    contact : {
        type : Number,
        required : true,
    },
    imageUrl :{
        type : String,
        required : true,
    }

})

const collectionAdmission = new mongoose.model("AdmissionDB", productSchema);
module.exports = collectionAdmission ;
