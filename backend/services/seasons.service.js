const seasonsDAL = require("../dal/seasons.dal");

async function getAllSeasons(seriesId, pageNumber, pageSize) {
    return seasonsDAL.getAllSeasons(seriesId, pageNumber, pageSize);
}

async function getSeasonsBySeriesId(seriesId) {
    return seasonsDAL.getSeasonsBySeriesId(seriesId);
}

async function addSeason(newSeason) {
    return seasonsDAL.addSeason(newSeason);
}

async function updateSeason(id, updates) {
    return seasonsDAL.updateSeason(id, updates);
}

async function deleteSeason(id) {
    return seasonsDAL.deleteSeason(id);
}

module.exports = {
    getAllSeasons,
    getSeasonsBySeriesId,
    addSeason,
    updateSeason,
    deleteSeason
};
