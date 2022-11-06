const Product = require("../models/Product")
const router = require ("express").Router()
const {verifyTokenAndAdmin, verifyToken, verifyTokenAndAuthorization} = require("./verifyToken")

//create 

router.post("/", verifyTokenAndAdmin, async (req,res)=>{
    const newProduct = new Product(req.body)

    try{
        const savedProduct = await newProduct.save()
    }
    catch(err){
        res.status(500).json(err)
    }
})
//update
router.put("/:id", verifyTokenAndAdmin, async (req,res)=>{
    try{
        const updateProduct = await Product.findeByIdAndUpdate(req.params.id,{$set: req.body},{new:true})
        res.status(200).json(updateProudct)
    }catch(err){
        res.status(500).json(err)
    }
})

//delete
router.delete("/:id",verifyTokenAndAdmin, async(req,res)=>{
    try{
        await Product.findbyIdAndDelete(req.params.id)
        res.status(200).json("product has been deleted...")
    }
    catch(err){
     res.status(500).json(err)  
    }
})

//get user
router.get("/find/:id", async(req,res)=>{
    try{
        const product = await Product.findbyId(req.params.id)
        res.status(200).json(product)
    }
    catch(err){
     res.status(500).json(err)  
    }
})

//get all products
router.get("/", async(req,res)=>{
    const qNew = req.query.new
    const qCategory = req.query.qCategory

    try{
        let product
        if (qNew) {
            products = await Product.find().sort({createdAdt:-1}).limit(1)
        }else if(qCategory){
            proucts = await Product.find({categories:{
                $in:[qCategory],
            }})
        }else{
            products = await Product.find()
        }

        res.status(200).json(products)
    }
    catch(err){
        res.status(500).json(err)  
    }
})


module.exports = router 