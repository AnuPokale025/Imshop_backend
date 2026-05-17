const mongoose = require('mongoose');
const wishlistSchema = new mongoose.Schema({
    userId: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    productId : {
        type :mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required : true
    },
    addedAt : {
        type : Date,
        default : Date.now
    },
    removedAt : {
        type : Date,
         default : null
    }

}, {timestamps: true});

module.exports = mongoose.model('Wishlist', wishlistSchema);