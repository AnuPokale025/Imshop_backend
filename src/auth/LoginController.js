
const bcrypt = require('bcrypt');
const Jwt = require('jsonwebtoken');
const Admin = require('../modal/Admin');
const User = require('../modal/User');
const Vendor = require('../modal/Vendor');


const LoginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({ result: "Email and password required" });
        }

        let account = null;
        let role = "";

    
        const vendor = await Vendor.findOne({ email });
        if (vendor) {
            account = vendor;
            role = "vendor";
        }
        
        const user = await User.findOne({ email });
        if (user) {
            account = user;
            role = "user";
        }

      
        const admin = await Admin.findOne({ email });
        if (admin) {
            account = admin;
            role = "admin";
        }

        if (!account) {
            return res.status(404).send({ result: "Account not found" });
        }

    
        const isMatch = await bcrypt.compare(password, account.password);

        if (!isMatch) {
            return res.status(401).send({ result: "Invalid password" });
        }

    
        const accountData = account.toObject();
        delete accountData.password;

        
        const token = Jwt.sign(
            { account: accountData, role },
           process.env.SECRET_KEY,
            { expiresIn: "2h" }
        );

        res.send({
            account: accountData,
            role,
            auth: token
        });

    } catch (error) {
        res.status(500).send({ result: "Server error" });
    }
};

module.exports = { login: LoginController };
