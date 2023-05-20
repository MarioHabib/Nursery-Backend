const mongoose = require("mongoose");

const schema=mongoose.Schema({
    _id:Number,
    name: String,
    supervisor: {type: Number,ref:"teacher"},
    children: {type: [Number],ref:"child"},
});

module.exports=mongoose.model("class",schema);