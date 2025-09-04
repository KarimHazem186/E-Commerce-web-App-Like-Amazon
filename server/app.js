require("dotenv").config()
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("./db/connect")
const cookieParser = require("cookie-parser")

const ProductsModel = require("./models/productsSchema")
const DefaultData = require("./defaultdata");

const cors = require("cors")

const router = require('./routes/router')

app.use(express.json());
app.use(cookieParser(""));
app.use(cors())
app.use(router)
const port = process.env.PORT || 8005;


// For deployment 
if(process.env.NOODE_ENV==="production"){
    app.use(express.static("client/bulid"))
}
 


app.listen(port,()=>{
    console.log(`server is running on port number ${port}`);
})

DefaultData();