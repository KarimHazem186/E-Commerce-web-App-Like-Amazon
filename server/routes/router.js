const express = require('express');
const router = new express.Router();
const ProductsModel = require("../models/productsSchema")
const usersModel = require('../models/userSchema')
const bcrypt = require('bcryptjs')
const authenticate = require("../middleware/authenticate")

// get productsdata api
router.get('/getproducts',async(req,res)=>{
    try {
        const productsdata = await ProductsModel.find();
        // console.log("console the data "+productsdata);
        res.status(201).json(productsdata);
    } catch (e) {
        console.log("error: "+ error.message);
    }
});

// get individual data
router.get('/getproductsone/:id',async(req,res)=>{
    try {
        // const {id} = req.params
        // console.log(id)
       
        const id = req.params.id
        const individualdata = await ProductsModel.findOne({id:id})
        console.log("individual data",individualdata)
        res.status(201).json(individualdata)
    } catch (error) {
        res.status(400).json(individualdata)
        console.log("error: "+ error.message);
    }
});

// regiser data 
router.post("/register",async(req,res)=>{
    // console.log(req.body)
    const {fname,email,mobile,password,cpassword} = req.body
    if (!fname||!email||!mobile||!password||!cpassword) {
        res.status(422).json({error:"fill the all data"})
        console.log(" not data avaliable")
    };

    try {
        const preuser = await usersModel.findOne({email:email})
        if(preuser) {
            res.status(422).json({error:"this user is already present"})
        } else if (password!==cpassword) {
            res.status(422).json({error:"password and cpassword not match"})
        } else {
            const finalUser = new usersModel ({
                fname,email,mobile,password,cpassword
            })
            
            // karim => encrypt wertd  ==> decrypt => karim
            // bcrybtjs
            // password hasing process

            const storedata = await finalUser.save();
            console.log(storedata)
            res.status(201).json(storedata)
        }
    } catch (error) {

    }
});

// Login User API
router.post('/login',async(req,res)=>{
    const {email,password} = req.body;
    if(! email || ! password) {
        res.status(400).json({error:"fill the all data"})
    };
    try {
        const userlogin = await usersModel.findOne({email:email});
        console.log("user value ",userlogin)

        if(userlogin) {
            const isMatch = await bcrypt.compare(password,userlogin.password);
            // console.log("Match Pass ",isMatch)
            
            // // token generated
            // const token = await userlogin.generateAuthToken();
            // // console.log(token)

            // res.cookie("Amazonweb",token,{
            //     expires: new Date(Date.now() + 900000),
            //     httpOnly: true
            // })
            
            if (!isMatch) {
                res.status(400).json({error:"Invalid details"})
            } else {
                // token generated
                const token = await userlogin.generateAuthToken();
                // console.log(token)

                res.cookie("Amazonweb",token,{
                    expires: new Date(Date.now() + 900000),
                    httpOnly: true
                })

                res.status(201).json({ 
                message: "password match", 
                user: userlogin 
                });
            } 
        } else {
            res.status(400).json({error:"Invalid details"})
        }
    } catch (error) {
        // res.status(400).json({error:"Invalid details"})
        res.status(400).json(userlogin)
    }
});

// add the data into cart

router.post("/addcart/:id",authenticate,async(req,res)=>{
    try {
        const {id} = req.params;
        const cart = await ProductsModel.findOne({id:id});
        console.log(cart+"cart value")

        const UserContact = await usersModel.findOne({_id:req.userID});
        console.log(UserContact)

        if(UserContact) {
            const cartData = await UserContact.addcartdata(cart);
            await UserContact.save();
            console.log(cartData);
            res.status(201).json(UserContact)
        } else {
            res.status(401).json({error:"invalid user"})
        }
    }catch(error) {
        res.status(401).json({error:"invalid user"})
    }

});

// get cart details

router.get("/cartdetails",authenticate,async(req,res)=>{
    try {
        const buyuser = await usersModel.findOne({_id:req.userID});
        res.status(201).json(buyuser);
    } catch(error) {
        console.log("error "+ error)
    }
});

// get valid user

router.get("/validuser",authenticate,async(req,res)=>{
    try {
        const validuserone = await usersModel.findOne({_id:req.userID});
        res.status(201).json(validuserone);
    } catch(error) {
        console.log("error "+ error)
    }
});

// remove item from cart
router.delete("/remove/:id",authenticate,async(req,res)=>{
    try {
        const {id} = req.params;
        req.rootUser.carts= req.rootUser.carts.filter((cruval)=>{
            return cruval.id != id;
        });
        req.rootUser.save()
        res.status(201).json(req.rootUser);
        console.log("item remove")
    } catch (error) {
        console.log("error "+error)
        res.status(400).json(req.rootUser);
    }
});

// token1,token2,token3,

// for user logout

router.get("/logout",authenticate,(req,res)=>{
    try {
        req.rootUser.tokens = req.rootUser.tokens.filter((currToken)=>{
            return currToken.token !== req.token
        });

        res.clearCookie("Amazonweb",{path:"/"});

        req.rootUser.save();
        res.status(201).json(req.rootUser.tokens);
        console.log("user logout")
    } catch (error) {
        // res.status(400).json(error);
        console.log("error for user logout")
    }
})



module.exports = router;