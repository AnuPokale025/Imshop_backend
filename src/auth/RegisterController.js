const Admin = require('../modal/Admin');
const User = require('../modal/User');
const Vendor = require('../modal/Vendor');

const RegisterController = async (req, res) => {
    try {
        const { role, phone, name, email, password } = req.body;

        const isUser = await User.findOne({ email });
        const isVendor = await Vendor.findOne({ email });
        const isAdmin = await Admin.findOne({ email });

        if (isUser || isVendor || isAdmin) {
            return res.status(400).send({
                result: "Email already exists"
            });
        }

        if (!role || !phone || !name || !email || !password) {
            return res.status(400).send({ result: "All fields are required" });
        }

        let savedUser;

        if (role === "user") {
            const userData = new User({ phone, name, email, password });
            savedUser = await userData.save();
        }
        else if (role === "vendor") {
            const vendorData = new Vendor({ phone, name, email, password });
            savedUser = await vendorData.save();
        }
        else if (role === "admin") {
            const adminData = new Admin({ phone, name, email, password });
            savedUser = await adminData.save();
        }
        else {
            return res.status(400).send({ result: "Invalid role" });
        }

        let result = savedUser.toObject();
        delete result.password;

        res.send({
            result,
            role
        });

    } catch (error) {
        res.status(500).send({ result: "Something went wrong", error });
    }
};

module.exports = { register: RegisterController };