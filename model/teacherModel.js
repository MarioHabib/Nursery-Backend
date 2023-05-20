const mongoose = require("mongoose");

const schema=mongoose.Schema({
    _id:Number,
    fullName: String,
    password: String,
    email: String,
    image: String,
    class: {type: Number,ref:"class"}
});

module.exports=mongoose.model("teacher",schema);