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
            },
            seasons: {
                type: DataTypes.INTEGER,
                episodes: {
                    type: DataTypes.INTEGER,
                    required: true
                },
                required: true
            },
            img: {
                type: DataTypes.STRING,
                required: true
            }
        }
    )
}

module.exports = seriesModel;