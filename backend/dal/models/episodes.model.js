// const { DataTypes } = require("sequelize");

// const episodessModel = (Sequelize) => {
//     return Sequelize.define(
//         'Episode',
//         {
//             id: {
//                 type: DataTypes.INTEGER,
//                 autoIncrement: true,
//                 primaryKey: true
//             },
//             season: {
//                 type: DataTypes.INTEGER,
//                 required: true
//             },
//             episode: {
//                 type: DataTypes.INTEGER,
//                 required: true
//             }
//         }
//     )
// }

// module.exports = episodessModel;


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
