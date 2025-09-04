const mongoose = require('mongoose')

// const DB = 'mongodb+srv://mern-auth:mern1234@mern-auth.embzx.mongodb.net/Amazonweb?retryWrites=true&w=majority&appName=MERN-Auth'
const DB = process.env.DATABASE
mongoose.connect(DB).then(()=>console.log("database connected")).catch((error)=>console.log("error ",+error.message));