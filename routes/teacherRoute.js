const express=require("express");
const controller=require("../controller/teacherController");
const validator=require("../middleware/validator");
const router=express.Router();




router.route("/teachers")
      .get(controller.getAllTeachers)
      .post(validator.validateTeacher,controller.addTeacher)
      .put(controller.updateTeacher)
      .delete(controller.deleteTeacher)
router.route("/teachers/supervisors")
      .get(controller.getAllClassSupervisors)
router.route("/teachers/:id")
      .get(controller.getTeacherById)
      
module.exports=router;


