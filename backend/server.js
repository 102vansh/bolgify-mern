const express = require('express')
const dotenv = require('dotenv')
const app = express()
const fileUpload = require('express-fileupload')
const cookieparser = require('cookie-parser')
require('./db/conn')
const {errorMiddleware,ErrorHandler} = require('./middleware/error')
dotenv.config({path:'./config/config.env'})
const cloudinary = require('cloudinary').v2
const port = process.env.PORT
const cors = require('cors')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieparser())
app.use(cors({
  origin: 'http://localhost:5173',
  methods:['POST','GET','PUT','DELETE'],
  credentials:true
}))
cloudinary.config({ 
    cloud_name: 'dysapzsm4', 
    api_key: '872647735318549', 
    api_secret: 'guwZRM21cXqj7oUeoc9VHU0ULOo' 
  });
  app.use(
    fileUpload({
      useTempFiles: true,
      tempFileDir: "/tmp/",
    })
  );
  
const userrouter = require('./routes/user.routes')
const blogrouter = require('./routes/blog.routes')

app.use('/api/v1/user',userrouter)
app.use('/api/v1/blog',blogrouter)
app.use(errorMiddleware)
app.listen(port,(req,res)=>{
    console.log(`server is rnning at port no..${port}`)
})
