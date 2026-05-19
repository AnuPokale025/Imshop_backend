const mongoose = require('mongoose');
const WebhookSchema = new mongoose.Schema({
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
    eventType: {
        type: String,
        required: true,
        enum: ['PaymentSuccess', 'PaymentFailed', 'OrderCreated', 'OrderCancelled']
    },
    status: {
        type: String,
        enum: ['Pending', 'Processed', 'Failed']
    },
    receivedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const WebhookModel = mongoose.model('Webhook', WebhookSchema);
module.exports = WebhookModel;