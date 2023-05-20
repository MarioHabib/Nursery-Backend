const express=require("express");
const controller=require("../controller/childController");
const validator=require("../middleware/validator");
const router=express.Router();

router.route("/child")
      .get(controller.getAllChildren)
      .post(validator.validateChild,controller.addChild)
      .put(controller.updateChild)
      .delete(controller.deleteChild)

router.route("/child/:id")
      .get(controller.getChildById)
router.route("/child/class/:id")
      .get(controller.getChildClassInfo)


module.exports=router;