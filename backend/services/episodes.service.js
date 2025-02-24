const episodesDAL = require("../DAL/episodes.dal");

async function getAllEpisodes(pageNumber, pageSize) {
    return episodesDAL.getAllEpisodes(pageNumber, pageSize);
}

async function getEpisodeBySeriesId(id) {
    return episodesDAL.getEpisodeBySeriesId(id)
}

async function addEpisodes(newEpisode) {
    return episodesDAL.addEpisodes(newEpisode)
}

async function addWatch(userId, episodeId) {
    return episodesDAL.addWatch(userId, episodeId)
}

async function getUsersWhoWatched(id) {
    return episodesDAL.getUsersWhoWatched(id)
}


async function updateEpisode(id, updates) {
    return episodesDAL.updateEpisode(id, updates)
}

async function deleteEpisode(id) {
    return episodesDAL.deleteEpisode(id)
}

module.exports = {
    getAllEpisodes,
    getEpisodeBySeriesId,
    addEpisodes,
    addWatch,
    getUsersWhoWatched,
    updateEpisode,
    deleteEpisode
}