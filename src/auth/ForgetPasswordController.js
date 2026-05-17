const Admin = require('../modal/Admin');
const Vendor = require('../modal/Vendor');
const User = require('../modal/User');
const { generateOTP, sendOTP } = require('../service/OTPService');

const ForgetPassword =  async (req, res)=>{
try{
  const {email } = req.body;

  let user = await User.findOne({email})
  let role = 'User';

  if(!user){
    user = await Vendor.findOne({email})
    role = 'Vendor';
  }

  if(!user){
    user = await Admin.findOne({email})
    role = 'Admin';
  }

  if(!user){
    return res.status(400).send({message : "Email not registered"})
  }

  const otp = generateOTP();
  await sendOTP(email, otp);
  res.send({message : "OTP sent to your email ", email})
}catch(error){
  res.status(500).send({message : error.meassage})
}

};

module.exports = {forget: ForgetPassword};
