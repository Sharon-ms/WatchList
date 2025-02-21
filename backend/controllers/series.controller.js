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
        const { title, genre, image, year } = req.body;
        // const result = await seriesService.addSeries(newSeries);

        const result = await seriesService.addSeries({
            title,
            genre,
            image,
            year
        });

        // עכשיו נוסיף את העונות והפרקים
        // if (seasons && Array.isArray(seasons)) {
        //     for (const season of seasons) {
        //         // יצירת עונה חדשה
        //         const newSeason = await seasonsService.addSeason({
        //             seriesId: newSeries.id,
        //             seasonNumber: season.seasonNumber
        //         });

        //         // אם יש פרקים לעונה, נוסיף אותם
        //         if (season.episodes && Array.isArray(season.episodes)) {
        //             for (const episode of season.episodes) {
        //                 await Episode.create({
        //                     seasonId: newSeason.id,
        //                     title: episode.title
        //                 });
        //             }
        //         }
        //     }
        // }

        res.send(result)
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