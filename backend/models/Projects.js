module.exports = (sequelize, DataTypes) => {
    const Projects = sequelize.define("Projects", {
      projectID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      repositoryLink: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      teamID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Teams', // This is a reference to another model
          key: 'teamID', // This is the column name of the referenced model
        }
      }
    });
  
    Projects.associate = function(models) {
      // associations can be defined here
      Projects.belongsTo(models.Teams, {foreignKey: 'teamID', as: 'team'});
    };
  
    return Projects;
  };