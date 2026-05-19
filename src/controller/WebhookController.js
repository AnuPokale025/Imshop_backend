const Webhook = require('../modal/Webhook');
const VerifyToken = require("../auth/VerifyToken")

const WebhookController = async (req, res) => {
    try {
        const io = req.app.get("io");
        const { userId, orderId } = req.params;
        const { eventType, status } = req.body;

        if (!userId || !orderId || !eventType) {
            return res.status(400).send({ message: "All fields are required" });
        }
        const webhook = new Webhook({
            userId: userId,
            orderId: orderId,
            eventType: eventType || 'PaymentSuccess',
            status: status || 'Pending',
            receivedAt: new Date()
        });
        const result = await webhook.save();
        io.emit("newWebhook", result);
        res.status(201).send({
            message: "Webhook received",
            data: result
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = { webhookController: WebhookController }