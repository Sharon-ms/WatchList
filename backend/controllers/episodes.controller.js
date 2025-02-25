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
        console.log(id);

        const episode = await episodesService.getEpisodeById(id);
        res.send(episode)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

async function getEpisodesBySeriesId(req, res) {
    try {
        const seriesId = Number(req.params.seriesId);
        const episode = await episodesService.getEpisodesBySeriesId(seriesId);
        res.send(episode)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

async function addEpisodes(req, res) {
    try {
        const newEpisode = req.body;
        const result = await episodesService.addEpisodes(newEpisode);
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

async function getUsersWhoWatched(req, res) {
    try {
        const { id } = req.params;
        console.log("Received request for users in episode:", id);

        const users = await episodesService.getUsersWhoWatched(id);

        if (users.error) {
            return res.status(404).json({ message: users.error });
        }

        res.json(users);
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
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
    getEpisodesBySeriesId,
    addEpisodes,
    addWatch,
    getUsersWhoWatched,
    updateEpisode,
    deleteEpisode
}