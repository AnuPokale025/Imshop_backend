const SubCategory = require('../modal/Subcategory');

const getAllSubcategories = async (req, res) => {
    let subcatgory = await SubCategory.find().populate('categoryId', 'name');
    res.send(subcatgory);
};

const getSubcategoryById = async (req, res) => {
    try {
        const subcategoryId = req.params.subcategoryId;
        const subcategory = await SubCategory.findById(subcategoryId).populate('categoryId', 'name');
        if (!subcategory) {
            return res.status(404).send({ result: "Subcategory not found" });
        }
        res.send(subcategory);                       
    } catch (error) {
        res.status(500).send({ result: "Error fetching subcategory", error: error.message });
    }
};

const addSubcategory = async (req, res) => {
    try {
        // const { categoryId, vendorId } = req.params;
         const vendorId = req.params.vendorId
        const categoryId = req.params.categoryId
       
        const { name } = req.body;

        // validation
        if (!name) {
            return res.status(400).send({ result: "Subcategory name is required" });
        }

        const subcategory = new SubCategory({
            name,
            categoryId,
            vendorId
        });
   
        const result = await subcategory.save();

        res.status(201).send({
            message: "Subcategory added successfully",
            data: result
        });

    } catch (error) {
        res.status(500).send({
            result: "Error adding subcategory",
            error: error.message
        });
    }
};

module.exports = { getAllSubcategories, getSubcategoryById, addSubcategory };   