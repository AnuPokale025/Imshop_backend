const Cart = require('../modal/Cart');

const getCartItems = async (req, res) => {
    let cart = await Cart.find().populate('userId', 'name').populate('productId', 'name price');
    res.send(cart);
};

const getCartItemsById = async (req, res) => {
    try {
        const cartId = req.params.cartId;
        const cart = await Cart.findById(cartId).populate('userId', 'name').populate('productId', 'name price');
        if (!cart) {
            return res.status(404).send({
                result: "Cart item is not found"
            })
        }
        res.send(cart);
    } catch (error) {
        res.status(500).send({ result: "Error fetching cart items", error: error.message });
    }
};


const addCartItem = async (req, res) => {

    try {
        const { userId, productId } = req.params;
        const { quantity } = req.body;
        if (!userId || !productId || !quantity) {
            return res.status(400).send({ result: "USerid, productId and quantity are required" })
        }

        const CartItem = new Cart({
            userId,
            productId,
            quantity: Number(quantity),
            status: 'active'
        });
        const result = await CartItem.save();
        res.send({
            result: "Product addded to cart successfully",
            data: result
        });
    }


    catch (error) {
        return res.status(500).send({
            result: "Error to add product to cart",
            error: error.message
        })
    }


};

const deleteCartItem = async (req, res) => {
    try {
        const cartId = req.params.cartId;
        const result = await Cart.deleteOne({
            _id: cartId
        })
        res.status(200).send({
            message: "Cart item is deleted",
            data: result
        })
    } catch (error) {
        res.status(500).send({
            result: "Error deleting cart item",
            error: error.message
        })
    }
};

module.exports = { getCartItems, getCartItemsById, addCartItem, deleteCartItem };