const Profile = require('../modal/Profile');
const User = require("../modal/User");
const Admin = require("../modal/Admin");
const Vendor = require ("../modal/Vendor")

const ProfileController = async (req, res) => {
    let profile = await Profile.find();
    res.send(profile);
};

module.exports =  ProfileController ;