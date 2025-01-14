const productControl=require("../Controler/productControl")
const express=require ('express')
const router=express.Router()

router.get("/getall",productControl.getAll)
router.post("/add",productControl.Add)
router.delete("/delete/:id",productControl.Delete)
router.put("/update/:id",productControl.Update)


module.exports=router