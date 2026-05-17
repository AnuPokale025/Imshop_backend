const Order = require('../modal/Order');
const VerifyToken = require("../auth/VerifyToken")

const getAllOrders = async (req, res) => {
    let order = await Order.find();
    res.send(order);
}

const getOrderById = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).send({ result: "Order not found" });

        }
        res.send(order);

    } catch (error) {
        res.send({ result: "Error fetching order", error: error.message });
    }
}

const addOrder = async (req, res) => {
    try {
        const io = req.app.get("io");
        const userId = req.params.userId
        const productId = req.params.productId
        const { quantity, totalprice } = req.body
        if (!userId || !productId || !quantity || !totalprice) {
            return res.status(400).send({ result: "All fields are required" });
        }

        const order = new Order({
            userId,
            productId,
            quantity,
            totalprice,
            orderDate: new Date()
        })

        const result = await order.save();
        io.emit("newOrder", result);
        res.status(200).send({
            message: "Order is created",
            data: result
        })
    }
    catch (err) {
        res.status(500).send({ result: "Error adding order", err })
    }
}

const deleteOrder = async (req, res) => {
    try {
        const io = req.app.get("io");
        const orderId = req.params.orderId
        
        const result = await Order.deleteOne({
            _id: orderId
        });
        io.emit("deleteOrder", {
            orderId: orderId
        });

        res.status(200).send({
            message: "Order delete Succefuly",
            data: result
        })

    } catch (err) {
        return res.status(500).send({ message: "Error deleting order" })
    }
}

module.exports = { getAllOrders, getOrderById, addOrder, deleteOrder };