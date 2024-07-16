const { ErrorHandler } = require('../middleware/error')
const Blog  = require('../models/blog.model')
const cloudinary = require('cloudinary')


exports.createblog = async(req,res,next) =>{
    try{
    const {title,intro,category,paraOneDescription,paraOneTitle,paraTwoTitle,paraTneDescription} = req.body
    const createdBy = req.user._id;
    const authorName = req.user.name;
    const authorAvatar = req.user.avatar.url;
    if(!title || !intro || !category){
        return next(new ErrorHandler("Please fill all the Details",500))
    }
    const{mainImage,paraOneImage,paraTwoImage} = req.files
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("User Avatar Required!", 400));
      }
      const cloudinaryResponse = await cloudinary.uploader.upload(
        mainImage.tempFilePath,
      )
      const cloudinaryOneResponse = await cloudinary.uploader.upload(
        paraOneImage.tempFilePath,
      )
      const cloudinaryTwoResponse = await cloudinary.uploader.upload(
        paraTwoImage.tempFilePath,
      )
      if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error(
          "Cloudinary error:",
          cloudinaryResponse.error || "Unknown cloudinary error!"
        );
      }
      if (!cloudinaryOneResponse || cloudinaryOneResponse.error) {
        console.error(
          "Cloudinary error:",
          cloudinaryOneResponse.error || "Unknown cloudinary error!"
        );
      }
      if (!cloudinaryTwoResponse || cloudinaryTwoResponse.error) {
        console.error(
          "Cloudinary error:",
          cloudinaryTwoResponse.error || "Unknown cloudinary error!"
        );
      }
     
    const blog = await Blog.create({title,intro,category,
      paraOneDescription,paraOneTitle,paraTwoTitle,paraTneDescription,
        mainImage:{
            public_id:cloudinaryResponse.public_id,
            url:cloudinaryResponse.secure_url
        },
        paraOneImage:{
          public_id:cloudinaryOneResponse.public_id,
          url:cloudinaryOneResponse.secure_url
        },
        paraTwoImage:{
          public_id:cloudinaryTwoResponse.public_id,
          url:cloudinaryTwoResponse.secure_url
        },
        authorAvatar,
        authorName,
        createdBy
    
      
        
    })
    res.status(201).json({
        success:true,
        message:"blog created successfully",
        blog
    })
    }catch(error){
     
      //   res.status(401).json({
      //     success:false,
      //     message:"blog  not created successfully",
          
      // })
       return next(error)
    }
}
exports.getallblogs = async(req,res,next) =>{
    try{
        const blogs = await Blog.find({})
        if(!blogs){
            return next(new ErrorHandler("blog is not found",500))
        }
        res.status(201).json({
            success:true,
            message:"blog finded successfully",
            blogs
        })

    }catch(error){
      res.status(401).json({
        success:true,
        message:"blog finded unsuccessfully",
        
    })
      
return next(error)
    }
}
exports.deletelblogs = async(req,res,next) =>{
    try{
        const blog = await Blog.findById(req.params.id)
        if(!blog){
            return next(new ErrorHandler("blog is not found",500))
        }
        const deletelblogs = await Blog.findByIdAndDelete(req.params.id)
        res.status(201).json({
            success:true,
            message:"blog finded successfully",
            blog
        })

    }catch(error){
return next(error)
    }
}
exports.singleblog = async(req,res,next) =>{
    try{
const blog = await Blog.findById(req.params.id)
res.status(200).json({
    success:true,
    message:"single blog is founded",
    blog
})
    }catch(error){
return next(error)
    }
}
exports.myblog = async(req,res,next) =>{
    try{
        createdBy = req.user._id
        const blog = await Blog.find({createdBy })

res.status(200).json({
    success:true,
    message:"your blog is founded",
    blog
})
    }catch(error){
        return next(error)
    }
}
exports.updateblog = async(req,res,next) =>{
    try{
        const {id} = req.params
        const blog = await Blog.findById(id)
        if(!blog){
            return next(new ErrorHandler("blog is not found",500))
        }
        
        const newBlogData = {
            title: req.body.title,
            intro: req.body.intro,
            category: req.body.category,
            paraOneTitle: req.body.paraOneTitle,
            paraOneDescription: req.body.paraOneDescription,
            paraTwoTitle: req.body.paraTwoTitle,
            paraTwoDescription: req.body.paraTwoDescription,
           
            published: req.body.published,
          };

          const { mainImage, paraOneImage, paraTwoImage } = req.files;

          if (req.files && mainImage) {
            const blogMainImageId = blog.mainImage.public_id;
            await cloudinary.uploader.destroy(blogMainImageId);
            const newBlogMainImage = await cloudinary.uploader.upload(
              mainImage.tempFilePath
            );
            newBlogData.mainImage = {
              public_id: newBlogMainImage.public_id,
              url: newBlogMainImage.secure_url,
            };
          }
          if (req.files && paraOneImage) {
            const blogparaOneImageId = blog.paraOneImage.public_id;
            await cloudinary.uploader.destroy(blogparaOneImageId);
            const newBlogparaOneImage = await cloudinary.uploader.upload(
              paraOneImage.tempFilePath
            );
            newBlogData.paraOneImage = {
              public_id: newBlogparaOneImage.public_id,
              url: newBlogparaOneImage.secure_url,
            };
          }
          if (req.files && paraTwoImage) {
            const blogparaTwoImageId = blog.paraTwoImage.public_id;
            await cloudinary.uploader.destroy(blogparaTwoImageId);
            const newBlogparaTwoImage = await cloudinary.uploader.upload(
              paraTwoImage.tempFilePath
            );
            newBlogData.paraTwoImage = {
              public_id: newBlogparaTwoImage.public_id,
              url: newBlogparaTwoImage.secure_url,
            };
          }
          const updatedblog = await Blog.findByIdAndUpdate(blog._id,newBlogData)
          res.status(200).json({
            success:true,
            message:"single blog is updated",
            blog:updatedblog
        })
    }catch(error){
        return next(error)
    }
}
