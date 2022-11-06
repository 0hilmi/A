const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const app = express()
const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")
const cartRoute = require("./routes/cart")
const orderRoute = require("./routes/order")
const productRoute = require("./routes/product")
dotenv.config()

mongoose.connect(process.env.MONGO_URL).then(()=>console.log("db conection successfull")).catch((err)=>{console.log(err)})

app.listen(process.env.PORT || 5000, ()=>{
    console.log("backend server is runing on http://localhost:5000/")
})

app.use(express.json())

app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/products", productRoute)
app.use("/api/carts", cartRoute)
app.use("/api/order", orderRoute)




app.get("/api/test",()=>{console.log("hi")})
