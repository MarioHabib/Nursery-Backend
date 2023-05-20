const mongoose = require("mongoose");

const schema=mongoose.Schema({
    _id:Number,
    fullName:String,
    age: Number,
    level:String,
    address:{
        city:String,
        street:String,
        building:Number
    },
    class: {type: Number,ref:"class"}

});

module.exports=mongoose.model("child",schema);