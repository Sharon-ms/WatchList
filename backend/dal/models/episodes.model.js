const { DataTypes } = require("sequelize");

const episodessModel = (Sequelize) => {
    return Sequelize.define(
        'Episode',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            season: {
                type: DataTypes.INTEGER,
                required: true
            },
            episode: {
                type: DataTypes.INTEGER,
                required: true
            }
        }
    )
}

module.exports = episodessModel;