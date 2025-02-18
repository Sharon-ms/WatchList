const episodesService = require('../services/episodes.service');

async function getAllEpisodes(req, res) {
    try {
        const { pageNumber, pageSize } = req.query;
        const episodes = await episodesService.getAllEpisodes(Number(pageNumber), Number(pageSize));
        console.log(episodes)
        res.send(episodes)
    }
    catch (err) {
        res.status(500).send(err.message)
    }

}

async function getEpisodeById(req, res) {
    try {
        const id = Number(req.params.id);
        const episode = await episodesService.getEpisodeById(id);
        res.send(episode)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

async function addEpisode(req, res) {
    try {
        const newEpisode = req.body;
        const result = await episodesService.addEpisode(newEpisode);
        res.send(result)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

async function addWatch(req, res) {
    try {
        const { userId, episodeId } = req.body;
        const result = await episodesService.addWatch(userId, episodeId);
        res.send(result)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

async function updateEpisode(req, res) {
    try {
        const id = req.params.id;
        const updates = req.body;
        const result = await episodesService.updateEpisode(Number(id), updates);
        res.send(result)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

async function deleteEpisode(req, res) {
    try {
        const id = req.params.id;
        const result = await episodesService.deleteEpisode(Number(id));
        res.json(result)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

module.exports = {
    getAllEpisodes,
    getEpisodeById,
    addEpisode,
    addWatch,
    updateEpisode,
    deleteEpisode
}