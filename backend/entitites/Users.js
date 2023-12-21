module.exports=(sequelize, DataTypes)=>{
  const Users=sequelize.define("Users",{
  Id:{
      type:DataTypes.INTEGER,
      allowNull:false, 
  },
 name:{
      type:DataTypes.STRING,
      allowNull:false,
  },
  email:{
      type:DataTypes.STRING,  
      allowNull:false,
  },
 password:{
      type:DataTypes.STRING,
      allowNull:true,
  }
  });
  return Users
  };