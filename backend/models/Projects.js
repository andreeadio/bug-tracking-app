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

  });

  Projects.associate = function (models) {

    Projects.hasMany(models.Bugs, { foreignKey: 'projectID', as: 'bugs' });
  };

  return Projects;
};