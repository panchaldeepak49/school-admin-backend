const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    stuId : {
        type : String,
        required : true,
    },
    name : {
        type : String,
        required : true,
    },
    imageUrl : {
        type : String,
    },
    april : {
        type : Number,
        // required : true,
    },
    may : {
        type : Number,
        // required : true,
    },
    june : {
        type : Number,
        // required : true,
    },
    july : {
        type : Number,
        // required : true,
    },
    august : {
        type : Number,
        // required : true,
    },
    september : {
        type : Number,
        // required : true,
    },
    october :{
        type : Number,
        // required : true,
    },
    november :{
        type : Number,
        // required : true,
    },
    december :{
        type : Number,
        // required : true,
    },
    january :{
        type : Number,
        // required : true,
    },
    feb :{
        type : Number,
        // required : true,
    },
    march :{
        type : Number,
        // required : true,
    },
    totalAmountDue : {
        type : Number,
    },
    totalAmountAccepted : {
        type : Number,
        //required : true,
    },
    amountPending : {
        type : Number,
        //required : true,
    },
    
})

const collectionFee = new mongoose.model("FeeDB", productSchema);
module.exports = collectionFee ;