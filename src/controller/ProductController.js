const Product = require('../modal/Product');
const uploadImage = require('../service/ImageKitService');

const getAllProducts = async (req, res) => {
    let products = await Product.find();
    res.send(products);
};

const getProductById = async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = await Product.findById(productId).populate('categoryId', 'name').populate('subcategoryId', 'name');
        if (!product) {
            return res.status(404).send({
                result: "Product not found"
            });

        }
        res.send(product);
    } catch (error) {
        res.send({
            result: "Error fetching product",
            error: error.message
        })
    }
};

const addProduct = async (req, res) => {

    try {

        const categoryId = req.params.categoryId;
        const subcategoryId = req.params.subcategoryId;

        const { name, price, company } = req.body;

        // Validation
        if (!categoryId || !subcategoryId || !name || !price || !company) {
            return res.status(400).send({
                message: "All fields are required"
            });
        }

        // Check image
        if (!req.file) {
            return res.status(400).send({
                message: "Image file is required"
            });
        }

        // Upload image to ImageKit
        const uploadedImage = await uploadImage(req.file.buffer);

        // Create product
        const product = new Product({
            categoryId,
            subcategoryId,
            name,
            price: Number(price),
            company,
            image: uploadedImage.url
        });

        // Save product
        const result = await product.save();

        res.status(201).send({
            message: "Product added successfully",
            data: result
        });

    } catch (error) {

        console.log(error);

        res.status(500).send({
            message: "Error adding product",
            error: error.message
        });
    }
};

module.exports = { getAllProducts, getProductById, addProduct};