const { connection, DataTypes } = require('sequelize');

module.exports=( connection, DataTypes )=>{
const Admin = connection.define(
    'Admin',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
         
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      
    },
    {
        timestamps: false
    },
  );
  return Admin
}

