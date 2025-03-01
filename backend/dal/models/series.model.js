


const { DataTypes } = require("sequelize");

const seriesModel = (sequelize) => {
    return sequelize.define(
        'Series',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            image: {
                type: DataTypes.STRING(2048),
                allowNull: false
            },
            genre: {
                type: DataTypes.STRING,
                allowNull: false
            },
            year: {
                type: DataTypes.INTEGER,
                required: true
            },
            seasonsAmount: {
                type: DataTypes.INTEGER,
                required: true
            },
        }
    );
};

module.exports = seriesModel;
