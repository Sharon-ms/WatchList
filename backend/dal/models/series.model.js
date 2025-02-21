// const { DataTypes } = require("sequelize");

// const seriesModel = (Sequelize) => {
//     return Sequelize.define(
//         'Series',
//         {
//             id: {
//                 type: DataTypes.INTEGER,
//                 autoIncrement: true,
//                 primaryKey: true
//             },
//             title: {
//                 type: DataTypes.STRING,
//                 required: true
//             },
//             image: {
//                 type: DataTypes.STRING,
//                 required: true
//             },
//             genre: {
//                 type: DataTypes.STRING,
//                 required: true
//             },
//             year: {
//                 type: DataTypes.INTEGER,
//                 required: true
//             }
//         }
//     )
// }

// module.exports = seriesModel;




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
                type: DataTypes.STRING,
                allowNull: false
            },
            genre: {
                type: DataTypes.STRING,
                allowNull: false
            },
            year: {
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

module.exports = seriesModel;
