const express=require("express");
const errorHandler = require("./middleware/errorhandler");
const connectDb = require("./config/dbConnection");
connectDb();
const app=express();
const dotenv=require("dotenv").config();
const port=5000;
app.listen(port, ()=>{
    console.log(`Server run on port ${port}`);
})
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);