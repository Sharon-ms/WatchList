const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require('./dal/db');

const usersRouter = require('./routers/users.router');
const seriesRouter = require('./routers/series.router');
const seasonsRouter = require('./routers/seasons.router');
const episodesRouter = require('./routers/episodes.router');


const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/users', usersRouter);
app.use('/series', seriesRouter);
app.use('/seasons', seasonsRouter);
app.use('/episodes', episodesRouter);

(async () => {
    try {
        await db.sequelize.authenticate();
        // await db.sequelize.sync({ force: true });
        app.listen(3001, () => {
            console.log("listening on 3001")
        })
    }
    catch (error) {
        console.error('unable to connect to the database:', error);
    }
})()