const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    phone : {
        type : Number,
        required : true
    },
    address : {
        type : String,
        required : true
    }

}, {timestamps: true});
module.exports = mongoose.model('Profile', profileSchema);