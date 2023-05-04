const cors = require('cors'); //dd
const express=require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
connectDb();
const app=express();
const dotenv=require("dotenv").config();
const port=5000;
app.use(cors());
app.listen(port, ()=>{
    console.log(`Server run on port ${port}`);
})
app.use(express.json());
app.use("/api/users", require("./routes/userRoutes"));

