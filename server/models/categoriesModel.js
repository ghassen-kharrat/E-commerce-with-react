module.exports=( connection, DataTypes )=>{
    const Categories = connection.define(
        'Categories',
        {
          name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          
        },
        {
            timestamps: false
        },
      );
      return Categories
    }
