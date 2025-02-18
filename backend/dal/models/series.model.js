const { DataTypes } = require("sequelize");

const seriesModel = (Sequelize) => {
    return Sequelize.define(
        'Series',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            title: {
                type: DataTypes.STRING,
                required: true
            },
            genre: {
                type: DataTypes.STRING,
                required: true
            },
            year: {
                type: DataTypes.INTEGER,
                required: true
            }
        }
    )
}

module.exports = seriesModel;