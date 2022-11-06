const Cart = require("../models/Cart")
const router = require ("express").Router()
const {verifyTokenAndAdmin, verifyToken, verifyTokenAndAuthorization} = require("./verifyToken")

//create 

router.post("/", verifyToken, async (req,res)=>{
    const newCart = new Product(req.body)

    try{
        const savedCart = await newCart.save()
        res.status(500).json(savedCart)
    }
    catch(err){
        res.status(500).json(err)
    }
})
-update
router.put("/:id", verifyTokenAndAuthorization, async (req,res)=>{
    try{
        const updateCart= await Cart.findeByIdAndUpdate(req.params.id,{$set: req.body},{new:true})
        res.status(200).json(updateCart)
    }catch(err){
        res.status(500).json(err)
    }
})

//delete
router.delete("/:id",verifyTokenAndAuthorization, async(req,res)=>{
    try{
        await Cart.findbyIdAndDelete(req.params.id)
        res.status(200).json("Cart has been deleted...")
    }
    catch(err){
     res.status(500).json(err)  
    }
})

//get user cart
router.get("/find/:id",verifyTokenAndAuthorization, async(req,res)=>{
    try{
        const cart= await Cart.findOne({userId: req.params.userId})
        res.status(200).json(Cart)
    }
    catch(err){
     res.status(500).json(err)  
    }
})

//get all
router.get("/",verifyTokenAndAdmin, async(req,res)=>{  
    try{
        const carts = await Cart.find()
        res.status(200).json(carts)
    }
    catch(err){
        res.status(500).json(err)  
    }
})

//get monthly income
router.get("/income",verifyTokenAndAdmin,async ( req,res)=>{
    
})
 
module.exports = router 