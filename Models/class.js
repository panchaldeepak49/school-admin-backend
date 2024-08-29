const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    class : {
        type : String,
        required : true,
    },
    fee : {
        type : String,
        required : true,
    },
})

const collectionClass = new mongoose.model('ClassDB',productSchema);
module.exports =  collectionClass 