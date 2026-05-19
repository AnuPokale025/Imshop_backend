const Wishlist = require('../modal/Wishlist');

const getWishlist =  async (req, res) => {
    let wishlist = await Wishlist.find();
    res.send(wishlist);
};

const getWishlistItemById = async (req, res) => {
    try {
        const wishlistId = req.params.wishlistId;
        const wishlist = await Wishlist.findById(wishlistId)
        if (!wishlist) {
            return res.send({ result: "Wishlist item is not found" });

        }
        res.send(wishlist);

    } catch (error) {
        res.send({
            result: "Error fetching wishlist item",
            error: error.message
        })
    }
};

const addWishlistItem = async (req, res) => {
    try {
        const io = req.app.get("io");
        const { userId, productId } = req.params;
        if (!userId || !productId) {
            return res.status(400).send({ result: "User ID and Product ID are required" });
        }
        const wishlistItem = new Wishlist({
            userId: userId,
            productId: productId
        });
        const result = await wishlistItem.save();
        io.emit("newWishlistItem", result);
        res.status(201).send({
            message: "Product added to wishlist successfully",
            data: result
        });
    } catch (error) {
        res.status(500).send({
            result: "Error adding product to wishlist",
            error: error.message
        });
    }
};

const deleteWishlist = async(req, res)=>{
    try{
        const io = req.app.get("io");
        const wishlistId = req.params.wishlistId

        const result = await Wishlist.deleteOne({
            _id: wishlistId
        })

        io.emit("deleteWishlist", {
            wishlistId: wishlistId
        });
        
        return res.status(200).send({
            message: "Remove item from wishlist",
            data : result
        })
    }catch(err){
        return res.status(500).send({mesage: Error }, err)
    }
}

module.exports = { getWishlist, getWishlistItemById, addWishlistItem, deleteWishlist }; 