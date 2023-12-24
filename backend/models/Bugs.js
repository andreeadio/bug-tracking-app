module.exports = (sequelize, DataTypes) => {
    const Bugs = sequelize.define("Bugs", {
      bugID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      severity: {
        type: DataTypes.STRING,
        allowNull: false
      },
      priority: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      commitLink: {
        type: DataTypes.STRING,
        allowNull: true // Assuming that the commit link may not always be present
      },
      projectID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Projects',
          key: 'projectID'
        }
      },
      reportedByUserID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'userID'
        }
      },
      assignedToUserID: {
        type: DataTypes.INTEGER,
        allowNull: true, // Assuming it's possible for a bug to not be assigned immediately
        references: {
          model: 'Users',
          key: 'userID'
        }
      },
      status: {
        type: DataTypes.ENUM,
        values: ['Open', 'Closed', 'Resolved', 'In Progress', 'Verified'],
        allowNull: false,
        defaultValue: 'Open'
      }
    });
  
    Bugs.associate = function(models) {
      // associations can be defined here
      Bugs.belongsTo(models.Projects, { foreignKey: 'projectID', as: 'project' });
      Bugs.belongsTo(models.Users, { foreignKey: 'reportedByUserID', as: 'reporter' });
      Bugs.belongsTo(models.Users, { foreignKey: 'assignedToUserID', as: 'assignee' });
    };
  
    return Bugs;
  };
  