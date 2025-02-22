

const { DataTypes } = require("sequelize");

const episodeModel = (sequelize) => {
    return sequelize.define(
        'Episode',
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
            seriesId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            seasonNum: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            episodeNum: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            },
            updatedAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            }
        }
    );
};

module.exports = episodeModel;
