const Payment = require('../modal/Payment');
const VerifyToken = require("../auth/VerifyToken")

const VerifyPayement = async (req, res) => {
    try {
        const io = req.app.get('io');
        const { userId, orderId } = req.params;

        const { totalamount, method, status } = req.body;
        if (!userId || !orderId || !totalprice) {
            return res.status(404).send({ result: "All fields are reqired" })
        }
        const payment = new Payment({
            userId: userId,
            orderId: orderId,
            totalprice,
            orderId,
            paymentDate: new Date(),
            method: method || 'UPI',
            status: status || 'Pending'
        });

        const result = await payment.save();
        io.emit("newPayment", result);
        res.status(200).send({
            message: "Paymet is verified",
            data: result
        })

    } catch (err) {
        res.status(500).send({ result: "Error verifying payment", err })
    }
}

module.exports = { verifyPayment: VerifyPayement }