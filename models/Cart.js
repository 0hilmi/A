const mongoose = require("mongoose")

const CartSchema = new mongoose.Schema({
    userId:{type:String, require:true},
    prouducts:[{
        prouductId:{
            type:String
        },
        quantity:{
            type:Number,
            default:1
        }
    }],
    },
    {timestamps:true}
)

module.exports = mongoose.model("Cart", CartSchema)