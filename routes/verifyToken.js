const { request, Router } = require("express")
const jwt = require("jsonwebtoken")



const verifyToken = (req,res,next)=>{
    const authHeader = request.headers.token
    if(authHeader){
        const token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.JWT_SEC, (err,user)=>{
        if(err) res.status(403).json("token is nt valid")
        req.user = user 
        next()
       })
    }else{
        return res.status(401).json("you are not auth")
    }
}

const verifyTokenAndAuthorization = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
         next()
        }else{
            res.status(403).json("you are not allowed to do that!")
        } 
    })
}
//admins
const verifyTokenAndAdmin = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.isAdmin){
         next()
        }else{
            res.status(403).json("you are not allowed to do that!")
        } 
    })
}

//delete
router.delete("/:id",verifyTokenAndAuthorization, async(req,res)=>{
    try{
        await User.findbyIdAndDelete(req.params.id)
        res.status(200).json("user has been deleted...")
    }
    catch(err){
     res.status(500).json(err)  
    }
})

//get user
router.get("/find/:id",verifyTokenAndAdmin, async(req,res)=>{
    try{
        const user = await User.findbyId(req.params.id)
        const { password, ...others} = user._doc
        res.status(200).json(others)
    }
    catch(err){
     res.status(500).json(err)  
    }
})

//get all user
router.get("/",verifyTokenAndAdmin, async(req,res)=>{
    const query = req.query.new
    try{
        const users = query ? await User.find().sort({_id:-1}).limit(5) : await User.find()
        res.status(200).json(users)
    }
    catch(err){
        res.status(500).json(err)  
    }
})

//GET USER STATS
router.get("/stats". verifyTokenAndAdmin, async (req,res)=>{
    const date = new Date()
    const lastYear = new Date(date.setfullYear(date.getFullYear() - 1))
    
    try{
       
        const data = await User.aggregate([
        {$macth:{createdAdt:{$gte:lastYear}}},
        {
            $project:{
                month: {$month :"$createdAdt"}
            }
        },
        {
            $group:{
                _id:"$month", 
                total:{$sum:1}
            }
        }
    ])
    res.status(200).json(data)}
    catch(err){
        res.status(500).json(err)

    }

})
module.exports = {verifyTokenAndAdmin, verifyToken, verifyTokenAndAuthorization}