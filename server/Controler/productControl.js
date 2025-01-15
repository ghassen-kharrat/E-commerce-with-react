const {Admin,Products,Categories} =require("../models/index");


module.exports={
getAll:async(req,resp)=>{
try {
    const fetch=await Products.findAll({ include:[ {model:Categories,attributes:["name"]}, {model:Admin,attributes:["name"] }] })
    resp.status(200).send(fetch)
} catch (error) { console.log(error)}

},
Add:async(req,resp)=>{
    const {name,imageUrl,price,quantity,options,AdminId,CategoryId}=req.body
    try {
        const created=await Products.create({name,imageUrl,price,quantity,options,AdminId,CategoryId})
        resp.status(201).send("created")
    } catch (error) { console.log(error)}
    
    },
 Delete:async(req,resp)=>{
        const {id}=req.params
    
        try {
            const notdelete=await Products.findOne({where:{id:id}})
            if (!notdelete) {  
                resp.status(404).send("id not found")  
            }
            const deleted= await Products.destroy({where:{id:id}})
            resp.status(201).send("deleted")
        } catch (error) { console.log(error)}
        
        },
        Update:async(req,resp)=>{
            const {id}=req.params
            const {name,imageUrl,price,quantity,options,AdminId,CategoryId}=req.body
            try {
                const verifyid=await Products.findOne({where:{id:id}})
                if (!verifyid) {  
                    resp.status(404).send("id not found")  
                }
                const updated= await Products.update({name,imageUrl,price,quantity,options,AdminId,CategoryId},{where:{id:id}})
                resp.status(200).send( "Update successful");
            } catch (error) { console.log(error)}
            
            },
}