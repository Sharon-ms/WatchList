const episodesDAL = require("../DAL/episodes.dal");

async function getAllEpisodes(pageNumber, pageSize) {
    return episodesDAL.getAllEpisodes(pageNumber, pageSize);
}

async function getEpisodeById(id) {
    return episodesDAL.getEpisodeById(id)
}

async function addEpisode(newEpisode) {
    return episodesDAL.addEpisode(newEpisode)
}

async function addWatch(userId,episodeId) {
    return episodesDAL.addWatch(userId,episodeId)
}

async function updateEpisode(id, updates) {
    return episodesDAL.updateEpisode(id, updates)
}

async function deleteEpisode(id) {
    return episodesDAL.deleteEpisode(id)
}

module.exports = {
    getAllEpisodes,
    getEpisodeById,
    addEpisode,
    addWatch,
    updateEpisode,
    deleteEpisode
}