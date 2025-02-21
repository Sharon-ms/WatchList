const seasonsService = require('../services/seasons.service');

async function getAllSeasons(req, res) {
    try {
        const { pageNumber, pageSize } = req.query;
        const seasons = await seasonsService.getAllSeasons(Number(pageNumber), Number(pageSize));
        res.send(seasons);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
}

async function getSeasonsBySeriesId(req, res) {
    try {
        const seriesId = Number(req.params.seriesId);
        console.log("Series ID: ", seriesId);
        if (isNaN(seriesId)) {
            return res.status(400).send('Invalid series ID');
        }

        const seasons = await seasonsService.getSeasonsBySeriesId(seriesId);
        res.send(seasons);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
}

async function addSeason(req, res) {
    try {
        const { seriesId, seasonNumber } = req.body;
        const newSeason = await seasonsService.addSeason({
            seriesId,
            seasonNumber
        });
        res.send(newSeason);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
}

async function updateSeason(req, res) {
    try {
        const id = req.params.id;
        const updates = req.body;
        const updatedSeason = await seasonsService.updateSeason(Number(id), updates);
        res.send(updatedSeason);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
}

async function deleteSeason(req, res) {
    try {
        const id = req.params.id;
        const result = await seasonsService.deleteSeason(Number(id));
        res.json(result);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
}

module.exports = {
    getAllSeasons,
    getSeasonsBySeriesId,
    addSeason,
    updateSeason,
    deleteSeason
};
