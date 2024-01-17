module.exports = (sequelize, DataTypes) => {
  const Projects = sequelize.define("Projects", {
    projectID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    projectName: {
      type: DataTypes.STRING, // Add a field for project name
      allowNull: true,
    },
    repositoryLink: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    teamName: {
      type: DataTypes.STRING, // Add a field for team name
      allowNull: false,
    }
    // teamID: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true,
    //   references: {
    //     model: 'Teams', // This is a reference to another model
    //     key: 'teamID', // This is the column name of the referenced model
    //   }
    // }
  });

  // Projects.associate = function(models) {
  //   // associations can be defined here
  //   Projects.belongsTo(models.Teams, {foreignKey: 'teamID', as: 'team'});
  // };

  return Projects;
};