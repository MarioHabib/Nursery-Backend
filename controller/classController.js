const { validationResult } = require('express-validator');
const classSchema=require("./../model/classModel");
const teacherSchema=require("./../model/teacherModel");


exports.getAllClasses=(requset,response,next)=>{
  classSchema.find()
  .then(data=>{
    response.status(200).json(data)
  })
  .catch(error=>next(error))
  }

exports.addClass=(requset,response,next)=>{
  errors = validationResult(requset);
  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() });
  }
  let newClass= new classSchema({
    _id: requset.body.id,
    name: requset.body.name,
    supervisor: requset.body.supervisor,
    children: requset.body.children
  })
  
  teacherSchema.findOne({_id:requset.body.supervisor})
               .then(data=>{
                if(data==null){
                  throw(new Error("Validation Problem"))
                }else{
                  return newClass.save();
                }
                }).then((data)=>{
                response.status(201).json(data)
                })
                .catch(error=>next(error))
  }
exports.updateClass=(request,response,next)=>{
  classSchema.updateOne(
    { _id:request.body.id },
    { $set: { [request.body.key] : request.body.value } }
 ).then(data=>{
  response.status(200).json(data)
 })
 .catch(error=>next(error))
  }
exports.deleteClass=(request,response,next)=>{
  classSchema.deleteOne({_id:request.body.id})
  .then((data)=>{
    response.status(200).json(data)
  })
  .catch(error=>next(error))
  }

exports.getClassById=(request,response,next)=>{
  classSchema.findOne({_id:request.params.id})
  .then(data=>{
    if(data){
      response.status(200).json(data)
    }else{
      throw new Error(" Validation Class Error")
    }
    
  })
  .catch(error=>next(error))
 }
exports.getClassChildrenInfo=(request,response,next)=>{
  classSchema.findOne({_id:request.params.id})
  .populate({path:"children"})
  .then(data=>{
    if(data){
      response.status(200).json(data)
    }else{
      throw new Error(" Validation Class Error")
    }
    
  })
  .catch(error=>next(error))
 }
  
 
exports.getClassSupervisorInfo=(request,response,next)=>{
  classSchema.findOne({_id:request.params.id})
  .populate({path:"supervisor"})
  .then(data=>{
    if(data){
      response.status(200).json(data)
    }else{
      throw new Error(" Validation Class Error")
    }
    
  })
  .catch(error=>next(error))
 }
