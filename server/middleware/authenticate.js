const jwt = require("jsonwebtoken")
const usersModel = require("../models/userSchema")
const secretKey = process.env.KEY;

const authenticate = async(req,res,next)=>{
    try {
        const token = req.cookies.Amazonweb;

        const verifyToken = jwt.verify(token,secretKey);
        console.log("Verified token ",verifyToken)

        const rootUser = await usersModel.findOne({_id:verifyToken._id,"tokens.token":token});
        console.log("Root user ",rootUser)
        if(!rootUser) {throw new Error("user not found")}
        req.token = token
        req.rootUser = rootUser
        req.userID = rootUser._id

        next();

    } catch(error) {
        res.status(401).send("unauthorized: No token provide")
        console.log(error)
    }
}

module.exports = authenticate;