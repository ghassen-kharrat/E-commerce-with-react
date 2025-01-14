
const { connection, DataTypes } = require('sequelize');

module.exports=(connection, DataTypes)=>{
const Products = connection.define(
  'Products',
  {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    options: {
      type: DataTypes.JSON, 
      defaultValue: {
        promotion: false,
        verified: false,
        deliveryCost: 7,
        Available: true,
      },
    }
  
  },{timestamps: false}
)
return Products
}