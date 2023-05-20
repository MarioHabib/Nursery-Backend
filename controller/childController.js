const { validationResult } = require('express-validator');

const childSchema=require("./../model/childModel");

exports.getAllChildren=(requset,response,next)=>{
        childSchema.find()
        
        
                    .then(data=>{
                      response.status(200).json(data)
                    })
                    .catch(error=>next(error))
  }

exports.addChild=(requset,response,next)=>{
  errors = validationResult(requset);
  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() });
  }
    let newChild= new childSchema({
      _id: requset.body.id,
      fullName: requset.body.fullName,
      age: requset.body.age,
      level: requset.body.level,
      address: requset.body.address
    })

    newChild.save()
            .then((data)=>{
              response.status(201).json(data)
            })
            .catch(error=>next(error))
    
  }
exports.updateChild=(request,response,next)=>{
  
    childSchema.updateOne(
    { _id:request.body.id },
    { $set: { [request.body.key] : request.body.value } }
 ).then(data=>{
  response.status(200).json(data)
 })
 .catch(error=>next(error))
    
  }
exports.deleteChild=(request,response,next)=>{
  childSchema.deleteOne({_id:request.body.id})
  .then((data)=>{
    response.status(200).json(data)
  })
  .catch(error=>next(error))
  }

exports.getChildById=(request,response,next)=>{
  childSchema.findOne({_id:request.params.id})
  .then(data=>{
    if(data){
      response.status(200).json(data)
    }else{
      throw new Error(" Validation Child Error")
    }
    
  })
  .catch(error=>next(error))
    
 }
exports.getChildClassInfo=(request,response,next)=>{
  childSchema.findOne({_id:request.params.id}).populate({path:"class"})
  .then(data=>{
    if(data){
      response.status(200).json(data)
    }else{
      throw new Error(" Validation Child Error")
    }
    
  })
  .catch(error=>next(error))
    
 }