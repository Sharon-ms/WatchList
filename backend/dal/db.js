const {Sequelize} = require('sequelize');

const usersModel = require('./models/users.model');
const seriesModel = require('./models/series.model');
const episodesModel = require('./models/episodes.model');

const sequelize = new Sequelize(
    'watchlist',
    'root',
    'root',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

const User = usersModel(sequelize);
const Series = seriesModel(sequelize);
const Episode = episodesModel(sequelize);

User.belongsToMany(Episode,{through: "watched"});
Episode.belongsToMany(User,{through: "watched"});

Series.hasMany(Episode, {foreignKey: 'SeriesId'});
Episode.belongsTo(Series, {foreignKey: 'SeriesId'});

module.exports = {
    sequelize,
    User,
    Series,
    Episode
};
