module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    userID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    username: { // Added username field
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
    },
    role: {
      type: DataTypes.ENUM('MP', 'TST','BASIC'),
      allowNull: true,
      defaultValue:'BASIC'
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    }
   
  });
  return Users
};