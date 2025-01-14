const { Sequelize, DataTypes }=require("sequelize")
const config=require('../config/config')

const connection = new Sequelize(config.database,config.user, config.password, {
    host: config.host,
    dialect:  'mysql' })
    connection.authenticate()
    .then(()=>{console.log("connected sucess to Sequelize")})
    .catch((error)=>console.log("error",error))


const Categories =require('./categoriesModel')(connection, DataTypes)
const Products =require('./productModel')(connection, DataTypes)
const Admin =require('./adminModel')(connection, DataTypes)


Admin.hasMany(Products)
Products.belongsTo(Admin)

Categories.hasMany(Products)
Products.belongsTo(Categories)


// connection.sync({alter:true})
// .then(()=>console.log("Tables Created "))
// .catch((err)=>console.log("error ",err))

module.exports={Admin,Categories,Products}
