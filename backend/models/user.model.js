const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        validate: [validator.isEmail, "Please provide a valid email!"],
    },
    password:{
        type:String,
        require:true
    },
    phone:{
        type:Number,
        require:true
    },
    role:{
        type:String,
        require:true,
        enum:['Author','Reader']
    },
    
    avatar:{
       public_id:{
        type:String,
        // require:true
       },
       url:{
        type:String,
        // require:true
       }
    },

   

}


,{timestamps:true})

userSchema.pre("save",async function(next){
if(this.isModified('password')){
    this.password = await bcrypt.hash(this.password,10)
}  
next()

})

userSchema.methods.comparepassword = async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generatetoken = async function(){
return await jwt.sign({id:this._id},process.env.JWT_SECRET,{
    // expiresin:process.env.JWT_EXPIRE
})
}

module.exports = mongoose.model('User',userSchema)