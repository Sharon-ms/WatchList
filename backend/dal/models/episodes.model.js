

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
            seasonNum: {
                type: DataTypes.STRING,
                allowNull: false
            },
            episodeNum: {
                type: DataTypes.STRING,
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
