const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    rate:{
        type : Number,
        min: 1,
        max:5
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        refer: 'User'
    },
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        refer:'Product'
    },
    message: {
        type: String,
       
    }
}, {timestamps : true});

module.exports = mongoose.model('Feedback',feedbackSchema)