const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({  
    name: {
        type: String,
        required: true
    },
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor'
    }
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);