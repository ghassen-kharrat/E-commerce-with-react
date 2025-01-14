const control=require('../Controler/categorieControl')
const express=require('express')

const router=express.Router()

router.get("/getAll",control.getAll)
router.post("/add",control.Add)
router.delete("/delete/:id",control.Delete)
router.put("/update/:id",control.Update)
module.exports=router