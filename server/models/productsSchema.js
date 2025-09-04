const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    id:String,
    url:String,
    detailsUrl:String,
    title:Object,
    price:Object,
    description:String,
    discount:Object,
    tagline:String
});

const ProductsModel = new mongoose.model("products",productSchema)

module.exports = ProductsModel;