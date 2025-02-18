const { DataTypes } = require("sequelize");

const usersModel = (Sequelize) => {
    return Sequelize.define(
        'User',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                required: true
            },
            mail: {
                type: DataTypes.STRING,
                required: true 
            }
        }
    )
}

module.exports = usersModel;