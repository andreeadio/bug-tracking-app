module.exports = (sequelize, DataTypes) => {
    const BugStatus = sequelize.define("BugStatus", {
      statusID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      bugID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Bugs',
          key: 'bugID'
        }
      },
      status: {
        type: DataTypes.ENUM,
        values: ['Open', 'Closed', 'Resolved', 'In Progress', 'Verified'],
        allowNull: false
      },
      resolvedCommitLink: {
        type: DataTypes.STRING,
        allowNull: true // This field can be null if the bug is not yet resolved
      },
      resolvedByUserID: {
        type: DataTypes.INTEGER,
        allowNull: true, // This field can be null if the bug is not yet resolved
        references: {
          model: 'Users',
          key: 'userID'
        }
      }
    });
  
    BugStatus.associate = function(models) {
      // associations can be defined here
      BugStatus.belongsTo(models.Bugs, { foreignKey: 'bugID', as: 'bug' });
      BugStatus.belongsTo(models.Users, { foreignKey: 'resolvedByUserID', as: 'resolver' });
    };
  
    return BugStatus;
  };
  