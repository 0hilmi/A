const mongoose = require("mongoose")

const ProdcutSchema = new mongoose.Schema({
    title:{type:String, require:true, unique:true},
    description:{type:String, required:true,},
    img:{type:String, required: true},
    categories:{type:Array},
    size:{type:String},
    color:{type:String},
    price:{type:Number, required: true}
    },
    {timestamps:true}
)

module.exports = mongoose.model("Product", ProdcutSchema)