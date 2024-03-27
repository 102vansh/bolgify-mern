const User = require('../models/user.model')
const { ErrorHandler } = require('./error')
const jwt = require('jsonwebtoken')

exports.isauth = async(req,res,next)=>{
    try{
    const {token} = req.cookies
    if(!token){
        return next(new ErrorHandler("token is not found",400))
    }

    const decoded = await jwt.verify(token,process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id)
    next()
}catch(error){
    return next(error)
}
}
exports.isAuthorized = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return next(
          new ErrorHandler(
            `User with this role(${req.user.role}) not allowed to access this resource`
          )
        );
      }
      next();
    };
  };