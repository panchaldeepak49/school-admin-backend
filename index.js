const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
//const fileUpload = require('express-fileupload')
require("dotenv").config();

const connectDB = require('./db/connect');
connectDB();

const my_routes = require('./routes/myRoutes');


app.use(express.json());
app.use(bodyParser.urlencoded({
    extended : false
}))
app.use(cors());

/////////////////////////////////////////////////
// const { uploadFileCloud } = require('./Controllers/fileUploadCloud');       //used here as new 

// app.use(fileUpload());
// app.post('/api/upload/cloud',uploadFileCloud)     //used here as new 

/////////////////////////////////////////////////
const { uploadFileCloud1,upload } = require('./Controllers/fileUploadMulterCloud');   //used here as new 
app.post('/api/upload/cloud',upload.single('file'),uploadFileCloud1) 



app.use('/api',my_routes);
app.use('/profile',express.static('Uploads/Images'));  //This is for specifying the url of image uploaded only


app.get('/',(req,res)=>{
    return res.send('Hello world')
})

app.listen(process.env.PORT,()=>{
    console.log('server is working')
})