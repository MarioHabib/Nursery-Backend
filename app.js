const express=require("express");
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require("mongoose");
const childRouter=require("./routes/childRoute");
const classRouter=require("./routes/classRoute");
const teacherRouter=require("./routes/teacherRoute");

const server=express();
const port=process.env.PORT||8080;

mongoose.connect('mongodb://127.0.0.1:27017/Nursery')
        .then(()=>{
            console.log("DB connected");
            server.listen(port,()=>{
                console.log("I am listening ... ");
            });
        })
        .catch((error)=>{
            console.log("DB connected error",error);
        })




// Logger
server.use(morgan(function (tokens, req, res) {
    return [
      tokens.url(req, res),
      tokens.method(req, res),
    ].join(' ')
}))


// Cors
const corsOptions = {
    origin: `http://127.0.0.1:${port}/`,
    optionsSuccessStatus: 200
  }
server.use(cors(corsOptions));

// Routes
server.use(express.json());

server.use(teacherRouter);
server.use(childRouter);
server.use(classRouter);




// 404 Not Found
server.use((req,res,next)=>{
    res.status(404).json({message: "Page not found"});
})




// Error 500
server.use((err,req,res,next)=>{
    res.status(500).json({message: "error "+err});
})