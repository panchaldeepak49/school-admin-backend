const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const connectDB = require('./db/connect');
connectDB();

const my_routes = require('./routes/myRoutes')

app.use(express.json());
app.use(bodyParser.urlencoded({
    extended : false
}))

app.use(cors());
app.use('/api',my_routes);
app.use('/profile',express.static('Uploads/Images'));  //This is for specifying the url of image uploaded only

app.get('/',(req,res)=>{
    return res.send('Hello world')
})

app.listen(5000,()=>{
    console.log('server is working')
})