module.exports = (sequelize, DataTypes) => {
    const TeamMembers = sequelize.define("TeamMembers", {
      teamMemberID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // This is a reference to another model
          key: 'userID', // This is the column name of the referenced model
        }
      },
      teamID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Teams', // This is a reference to another model
          key: 'teamID', // This is the column name of the referenced model
        }
      }
    });
  
    TeamMembers.associate = function(models) {
      // Define the many-to-many relationship through the junction table
      models.Users.belongsToMany(models.Teams, { through: TeamMembers, foreignKey: 'userID', otherKey: 'teamID' });
      models.Teams.belongsToMany(models.Users, { through: TeamMembers, foreignKey: 'teamID', otherKey: 'userID' });
    };
  
    return TeamMembers;
  };
  