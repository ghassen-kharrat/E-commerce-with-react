const control=require('../Controler/adminControl')
const express=require('express')

const router=express.Router()

router.get("/getAll",control.getAll)
router.delete("/delete/:id",control.Delete)
router.put("/update/:id",control.Update)
router.post("/register",control.register)
router.post("/login",control.login)
router.get("/current",control.currentAdmin)
router.post("/forget",control.forgetPassword)
router.post("/reset",control.resetPassword)
module.exports=router

