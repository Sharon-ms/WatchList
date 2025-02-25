const { Sequelize } = require('sequelize');
require('dotenv').config();

const usersModel = require('./models/users.model');
const seriesModel = require('./models/series.model');
const episodesModel = require('./models/episodes.model');

const sequelize = new Sequelize(
    'watchlist',
    'root',
    process.env.DB_PASSWORD,
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

const User = usersModel(sequelize);
const Series = seriesModel(sequelize);
const Episode = episodesModel(sequelize);

User.belongsToMany(Episode, { through: "watched" });
Episode.belongsToMany(User, { through: "watched" });

Series.hasMany(Episode, { foreignKey: 'SeriesId' });
Episode.belongsTo(Series, { foreignKey: 'SeriesId' });



sequelize.sync({ alter: true })
    .then(() => console.log('✅ Database synced successfully'))
    .catch(err => console.error('❌ Error syncing database:', err));


module.exports = {
    sequelize,
    User,
    Series,
    Episode
};
