const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        //required : true,
    },
    doj : {
        type : String,
        //required : true,
    },
    gender : {
        type : String,
        //required : true,
    },
    email : {
        type : String,
        //required : true,
    },
    contact : {
        type : String,
        //required : true,
    },
    address : {
        type : String,
        //required : true,
    },
    designation : {
        type : String,
        //required : true,
    },
    classAssigned : {
        type : String,
        // required : true,
    },
    salary : {
        type : String,
        //required : true,
    },
    bankName : {
        type : String,
        //required : true,
    },
    imageUrl : {
        type : String,
    }

})

const collectionStaff = new mongoose.model("StaffDB", productSchema);
module.exports = collectionStaff ;
