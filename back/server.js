const express=require("express");
const app=express();
const dotenv=require("dotenv").config();
const port=5000;
app.listen(port, ()=>{
    console.log(`Server run on port ${port}`);
})
