const mongoose = require ('mongoose');
const bcrypt = require('bcrypt');
const vendorSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true
    },
    phone:{
        type : Number,
        required : true
    },
    password:{
        type : String,
        required : true
    },
    role : {
        type : String,
        
    }
});

vendorSchema.pre('save', async function () {
    if (!this.isModified('password')) return;

    this.password = await bcrypt.hash(this.password, 10);
});


module.exports = mongoose.model('Vendor', vendorSchema);
