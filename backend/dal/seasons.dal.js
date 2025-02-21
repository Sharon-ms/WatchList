const { Season, Series } = require('./db');

// Get all seasons for a specific series
async function getAllSeasons(seriesId, pageNumber, pageSize) {
    return Season.findAll({
        where: { seriesId },
        offset: (pageNumber - 1) * pageSize,
        limit: pageSize
    });
}

// Get season by id
async function getSeasonById(id) {
    return Season.findByPk(id);
}

// Add new season
async function addSeason(newSeason) {
    return Season.create(newSeason);
}

// Update season by id
async function updateSeason(id, update) {
    return Season.update(update, { where: { id: id } });
}

// Delete season by id
async function deleteSeason(id) {
    return Season.destroy({ where: { id: id } });
}

module.exports = {
    getAllSeasons,
    getSeasonById,
    addSeason,
    updateSeason,
    deleteSeason
};
