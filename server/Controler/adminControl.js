const {Admin,Products,Categories} =require("../models/index");
const bcrypt=require("bcrypt")
const jwt = require("jsonwebtoken");
module.exports={
getAll:async(req,res)=>{
    try {
        const fetch=await Admin.findAll()
        res.status(200).send(fetch)
    } catch (error) {
        console.log("error",error);
        
    }

},

Delete:async(req,res)=>{
    const {id}=req.params
    try {
        const fetch=await Admin.destroy({where:{id}})
        res.status(200).send("deleted sucessfully")
    } catch (error) {
        console.log("error",error);
        
    }
},
Update:async(req,res)=>{
    const {id}=req.params
    const {name}=req.body
    try {
        const updated=await Admin.update({name},{where:{id}})
        res.status(200).send("Updated sucessfully")
    } catch (error) {
        console.log("error",error);
        
    }
},
register:async(req,resp)=>{
    try{
const {name,email,password}=req.body
const check=await Admin.findOne({where:{email}})
if (check) {
  return  resp.status(404).send("email existed")
}
const hachPassword=await bcrypt.hash(password,15)
 const newAdmin=await Admin.create({name:name,email:email,password:hachPassword})
 return resp.status(201).send("registred suceessfully")
    }
    catch{(error)=>{throw error}}

},
login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const admin = await Admin.findOne({ where: { email } });
      if (!admin) {
        return res
          .status(404)
          .send({ message: "email or password is incorrect" });
      }
      const comparePassword = await bcrypt.compare(password, admin.password);
      if (!comparePassword) {
        return res
          .status(401)
          .send({ message: "email or password is incorrect" });
      }
      const token = jwt.sign({ id: admin.id }, "1234", { expiresIn: "24h" });
      return res.status(201).send({ message: "Login success", admin, token });
    } catch (error) {
      throw error;
    }
  },
  currentAdmin: async (req,res) => {
    try {
      const admin = await Admin.findOne({ id: req.admin });
      res.send(admin);
    } catch (error) {}
  },
}


