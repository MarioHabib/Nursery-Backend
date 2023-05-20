const { validationResult } = require('express-validator');

const teacherSchema=require("./../model/teacherModel");
exports.getAllTeachers=(requset,response,next)=>{
  teacherSchema.find()
  .then(data=>{
    response.status(200).json(data)
  })
  .catch(error=>next(error))
  }

  
exports.addTeacher=(requset,response,next)=>{
  errors = validationResult(requset);
  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() });
  }

  let newTeacher= new teacherSchema({
    _id: requset.body.id,
    fullName: requset.body.fullName,
    password: requset.body.password,
    email: requset.body.email,
    image: requset.body.image
  })

  newTeacher.save()
          .then((data)=>{
            response.status(201).json(data)
          })
          .catch(error=>next(error))
  }
exports.updateTeacher=(request,response,next)=>{
  
  teacherSchema.updateOne(
    { _id:request.body.id },
    { $set: { [request.body.key] : request.body.value } }
 ).then(data=>{
  response.status(200).json(data)
 })
 .catch(error=>next(error))
  }
exports.deleteTeacher=(request,response,next)=>{
  teacherSchema.deleteOne({_id:request.body.id})
  .then((data)=>{
    response.status(200).json({data:"Teacher Deleted"})
  })
  .catch(error=>next(error))
  }

exports.getTeacherById=(request,response,next)=>{
  teacherSchema.findOne({_id:request.params.id})
  .then(data=>{
    if(data){
      response.status(200).json(data)
    }else{
      throw new Error(" Validation Teacher Error")
    }
    
  })
  .catch(error=>next(error))
 }
exports.getAllClassSupervisors=(request,response,next)=>{
  teacherSchema.find()
  .populate({path:"class"})
  .then(data=>{
    if(data){
      response.status(200).json(data)
    }else{
      throw new Error(" Validation Teacher Error")
    }
    
  })
  .catch(error=>next(error))
 }