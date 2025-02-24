

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
                allowNull: true
            },
            seasonNum: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            episodeNum: {
                type: DataTypes.INTEGER,
                allowNull: true
            }
        }
    );
};

module.exports = episodeModel;
