const mongoose = require('mongoose');
const PaymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    totalprice: {
        type: Number,
        required: true
    },
    PaymentDate: {
        type: Date,
        default: Date.now
    },
    method:{
        type: String,
        required: true,
        enum : ['UPI','Card','NetBanking','COD']
    },
    status:{
        type: String,
        required: true,
        enum : ['Pending','Completed','Failed']
    }

}, { timestamps: true });

const PaymentModel = mongoose.model('Payment', PaymentSchema);

module.exports = PaymentModel;
