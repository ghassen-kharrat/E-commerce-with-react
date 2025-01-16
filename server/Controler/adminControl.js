const {Admin,Products,Categories} =require("../models/index");
const bcrypt=require("bcrypt")
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
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
 return resp.status(201).send( newAdmin)
    }
    catch{(error)=>{console.log("error",error);
    }}

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
      console.log(error);
       
    }
  },
  currentAdmin: async (req,res) => {
    try {
      const admin = await Admin.findOne({ id: req.admin });
      res.send(admin);
    } catch (error) {}
  },

  forgetPassword: async (req, res) => {
    const { email } = req.body;
    try {
      const admin = await Admin.findOne({ where: { email } });
      if (!admin) {
        return res.status(404).send({ message: "Email not found" });
      }

      const resetToken = jwt.sign({ id: admin.id }, "1234", { expiresIn: "1h" });

    
      const resetLink = `http://localhost:5173/reset-password/?token=${resetToken}`;

      
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "testofmail.1989@gmail.com", 
          pass: "bzrf qulu lgfb zubm", 
        },
      });

      const mailOptions = {
        from: "testofmail.1989@gmail.com",
        to: email,
        subject: "Password Reset Request",
        text: `Click on this link to reset your password: ${resetLink}`,
      };

      await transporter.sendMail(mailOptions);

      res.status(200).send({ message: "Password reset link sent to email" });
    } catch (error) {
      console.log("Error:", error);
      res.status(500).send({ message: "An error occurred" });
    }
  },

  resetPassword: async (req, res) => {
    const { token, newPassword } = req.body;
    try {
     
      const decoded = jwt.verify(token, "1234");
      const admin = await Admin.findOne({ where: { id: decoded.id } });
      if (!admin) {
        return res.status(404).send({ message: "Invalid token" });
      }
      const hashedPassword = await bcrypt.hash(newPassword, 15);
      await Admin.update(
        { password: hashedPassword },
        { where: { id: admin.id } }
      );

      res.status(200).send({ message: "Password reset successfully" });
    } catch (error) {
      console.log("Error:", error);
      res.status(500).send({ message: "An error occurred" });
    }
  },
}



