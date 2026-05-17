 const mongoose = require('mongoose');

 const SubcategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    vendorId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor',
        required: true
    },
 }, {timestamps: true });

 module.exports = mongoose.model('Subcategory', SubcategorySchema);
 