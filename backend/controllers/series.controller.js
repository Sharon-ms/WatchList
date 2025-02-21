const seriesService = require('../services/series.service');
const seasonsService = require('../services/seasons.service');

async function getAllSeries(req, res) {
    try {
        const { pageNumber, pageSize } = req.query;
        const series = await seriesService.getAllSeries(Number(pageNumber), Number(pageSize));
        res.send(series)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

async function getSeriesById(req, res) {
    try {
        const id = Number(req.params.id);
        const series = await seriesService.getSeriesById(id);
        res.send(series);
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

async function addSeries(req, res) {
    try {
        const { title, seasonsNum, genre, image, year } = req.body;

        const newSeries = await seriesService.addSeries({
            title,
            image,
            genre,
            year
        });

        for (let i = 1; i <= seasonsNum; i++) {
            await seasonsService.addSeason({
                seriesId: newSeries.id,
                seasonNumber: i
            });
        }

        res.send(title, seasonsNum, genre, image, year)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

async function updateSeries(req, res) {
    try {
        const id = req.params.id;
        const updates = req.body;
        const result = await seriesService.updateSeries(Number(id), updates);
        res.send(result)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

async function deleteSeries(req, res) {
    try {
        const id = req.params.id;
        const result = await seriesService.deleteSeries(Number(id));
        res.json(result)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

module.exports = {
    getAllSeries,
    getSeriesById,
    addSeries,
    updateSeries,
    deleteSeries
}