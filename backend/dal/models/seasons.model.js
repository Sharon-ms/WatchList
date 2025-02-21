const { DataTypes } = require("sequelize");

const seasonsModel = (sequelize) => {
    return sequelize.define(
        'Season',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            seasonNumber: {
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

module.exports = seasonsModel;
