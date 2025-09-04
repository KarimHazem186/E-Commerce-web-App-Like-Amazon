const ProductsModel = require("./models/productsSchema")
const productsdata = require("./constant/productsdata")


const DefaultData = async()=>{
    try {

        await ProductsModel.deleteMany({});



        const storeData = await ProductsModel.insertMany(productsdata);
        // console.log(storeData)
    } catch (error) {
        console.log("Error ",error.message)
    }
}

module.exports = DefaultData;