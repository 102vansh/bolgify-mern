const mongoose = require('mongoose')
const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    mainImage: {
        public_id: {
          type: String,
        //   required: true,
        },
        url: {
          type: String,
        //   required: true,
        },
      },
      intro: {
        type: String,
        required: true,
        // minLength: [250, "Blog intro must contain at least 250 characters!"],
      },
   
      paraOneImage: {
        public_id: {
          type: String,
        },
        url: {
          type: String,
        },
      },
      paraOneDescription: {
        type: String,
      },
      paraOneTitle: {
        type: String,
      },
      paraTwoImage: {
        public_id: {
          type: String,
        },
        url: {
          type: String,
        },
      },
      paraTwoDescription: {
        type: String,
      },
      paraTwoTitle: {
        type: String,
      },
      category: {
        type: String,
        required: true,
      },
      createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        // required: true,
      },
      authorName: {
        type: String,
        required: true,
      },
      authorAvatar: {
        type: String,
        // required: true,
      },
      published: {
        type: Boolean,
        default: false,
      },
},{timestamps:true})
module.exports = mongoose.model('Blog',blogSchema)