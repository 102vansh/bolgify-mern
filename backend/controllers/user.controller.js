const User = require('../models/user.model')
const {ErrorHandler} = require('../middleware/error')
const cloudinary = require('cloudinary')
exports.registeruser = async(req,res,next) =>{
    try{
        
const {name,email,password,phone,role} = req.body
const {avatar} = req.files
if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("User Avatar Required!", 400));
  }
if(!name || !email || !password || !phone || !role){
    return next(new ErrorHandler("Please fill all the Details",500))
}
let user = await User.findOne({email})
if(user){
    
    return next(new ErrorHandler("You are all ready registered",500))
}
const cloudinaryResponse = await cloudinary.uploader.upload(
    avatar.tempFilePath
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary error:",
      cloudinaryResponse.error || "Unknown cloudinary error!"
    );
  }

user = await User.create({
    name,email,password,phone,role,
    avatar:{
        public_id:cloudinaryResponse.public_id,
        url:cloudinaryResponse.secure_url
    }
})
res.status(201).json({
    success:true,
    message:"User registered successfully",
    user
})
    }catch(error){
         return next(error)
        // res.status(400).json({
        //     success:false,
        //     message:"something Went Wrong"
        // })
    }
}
exports.login = async(req,res,next) =>{
    try{
const {email,password} = req.body
let user = await User.findOne({email})
if(!user){
    return next(new ErrorHandler("Register First",500))
}
const ismatch = await user.comparepassword(password)
if(!ismatch){
    return next(new ErrorHandler("Enter correct email or password",500))
}
const token = await user.generatetoken()
const option = {
    expiresin: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };

res.status(201).cookie('token',token,option).json({
    success:true,
    message:"User successfully login",
    user,
    token,
})

    }catch(error){
return next(error)
    }
}
exports.logout = async(req,res,next) =>{
    try{
res.cookie('token',null,{expires: new Date(Date.now())}).status(201).json({
    success:true,
    message:"User succesfully loged out"
})
    }catch(error){
return next(error)
    }
}

exports.getmyprofile = async(req,res,next) =>{
    try{
const user = await User.findById(req.user._id)
res.status(200).json({
    success:true,
    message:"my account is founded",
    user
})
    }catch(error){
return next(error)
    }
}
exports.allusers = async(req,res,next) =>{
    try{
const user = await User.find({})
res.status(200).json({
    success:true,
    message:"all account is founded",
    user
})
    }catch(error){
return next(error)
    }
}
exports.singleuser = async(req,res,next) =>{
    try{
const user = await User.findById(req.params.id)
res.status(200).json({
    success:true,
    message:"single account is founded",
    user
})
    }catch(error){
return next(error)
    }
}
exports.updatepassword = async(req,res,next) =>{
    try{
const{oldpassword,newpassword,confirmpassword} = req.body
const user = await User.findById(req.user._id)
if(!user){
    return next(new ErrorHandler("User not found",500))
}
const ismatch = await user.comparepassword(oldpassword)
if(!ismatch){
    return next(new ErrorHandler("password doesnot matched",500))
}
user.password = newpassword
if(newpassword !== confirmpassword){
    return next(new ErrorHandler("password and confirm password dosent match",500))
}
await user.save()
res.status(200).json({
    success:true,
    message:"User password updated successfully",
    updateuser
})
    }catch(error){
        return next(error)
    }
}
exports.updateprofile = async(req,res,next) =>{
    try{
const {name,email,role,phone} = req.body
const user = await User.findById(req.user._id)
if(!user){
    return next(new ErrorHandler("User not found",500))
}
const updateuser = await User.findByIdAndUpdate(req.user._id,{name,email,role,phone})
await updateuser.save()
res.status(200).json({
    success:true,
    message:"User updated successfully",
    updateuser
})
    }catch(error){
return next(error)
    }
}

exports.allauthor = async(req,res,next) =>{
    try{
const authors = await User.find({role:'Author'})
res.status(200).json({
    success:true,
    message:" author founded successfully",
    authors
})
    }catch(error){
       return next(error)
    }
}
