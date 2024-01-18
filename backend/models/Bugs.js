module.exports = (sequelize, DataTypes) => {
  const Bugs = sequelize.define("Bugs", {
    bugID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //severity works like a flag enabled/disabled so it's a boolean
    severity: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    priority: {
      type: DataTypes.ENUM('Low', 'Medium', 'High'),
      allowNull: false,
      defaultValue: 'Medium'
    },

    commitLink: {
      type: DataTypes.STRING,
      allowNull: true // Assuming that the commit link may not always be present
    },
    status: {
      type: DataTypes.ENUM,
      values: ['Open', 'In Progress', 'Implemented', 'Verified'],
      defaultValue: 'Open',
      allowNull: false
    },

    projectID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Projects',
        key: 'projectID'
      }
    },
    reportedByUser: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'userID'
      }
    },
    assignedToUser: {
      type: DataTypes.INTEGER,
      allowNull: true, // Assuming it's possible for a bug to not be assigned immediately
      references: {
        model: 'Users',
        key: 'userID'
      }
    },

  });


  Bugs.associate = function (models) {
    // associations can be defined here
    Bugs.belongsTo(models.Projects, { foreignKey: 'projectID', as: 'project' });
    Bugs.belongsTo(models.Users, { foreignKey: 'reportedByUser', as: 'reporter' });
    Bugs.belongsTo(models.Users, { foreignKey: 'assignedToUser', as: 'assignee' });
  };



  return Bugs;
};
