
module.exports = (sequelize, DataTypes) => {

    const Bugs = sequelize.define("Bugs", {
        //define the attributes
        // severitate, prioritate, descriere, link commit
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        severityFlag: {
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
            allowNull: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    })

    return Bugs
}