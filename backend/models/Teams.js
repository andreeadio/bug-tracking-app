module.exports = (sequelize, DataTypes) => {
    const Teams = sequelize.define("Teams", {
      teamID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      projectID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Projects', // This is a reference to another model
          key: 'projectID', // This is the column name of the referenced model
        }
      }
    });
  
    Teams.associate = function(models) {
      // associations can be defined here
      Teams.belongsTo(models.Projects, { foreignKey: 'projectID', as: 'project' });
      Teams.hasMany(models.Users, { foreignKey: 'teamID', as: 'members' });
    };
  
    return Teams;
  };
  