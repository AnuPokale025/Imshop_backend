
const Category = require('../modal/Category');

const getAllCategories = async (req, res) => {
    let category = await Category.find();
    res.send(category);
};

const getCategoryById = async (req, res) => {

    try {
        const categoryId = req.params.categoryId;
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).send({ result: "Category not found" });

        }
        res.send(category);
    } catch (error) {
        res.send({ result: "Error fetching category", error: error.message });
    }

};

const addCategory = async (req, res) => {
    try {
        const vendorId = req.params.vendorId;
        const { name } = req.body;

        if (!name) {
            return res.status(400).send({ result: "Category name is required", error: error.message });
        }

        const category = new Category({
            name,
            vendorId: vendorId
        });

        const result = await category.save();

        res.status(201).send({
            message: "Category added successfully",
            data: result
        });

    } catch (error) {
        res.status(500).send({
            result: "Error adding category",
            error: error.message
        });
    }   
};

const deleteCategory = async (req, res)=>{
    try{
        const categoryId = req.params.categoryId;
        const result =  await Category.deleteOne({
            _id : categoryId
        });
        res.status(200).send({
            message: "Category is deleted",
            data : result
        })
    }catch(error){
        res.status(500).send({
            message: "Error deleting category",
            error: error.message
        })
    }
}
module.exports = { getAllCategories, getCategoryById, addCategory, deleteCategory };