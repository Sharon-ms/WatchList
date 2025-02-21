const { User, Series, Episode } = require('./db');

// Get all
async function getAllSeries(pageNumber, pageSize) {
    return Series.findAll(
        {
            offset: (pageNumber - 1) * pageSize,
            limit: pageSize
        }
    );
}

// Get by id
async function getSeriesById(id) {
    return Series.findByPk(id)
}

// Add new series
async function addSeries(newSeries) {
    return Series.create(newSeries)
}

// Update series by id
async function updateSeries(id, update) {
    return Series.update(update, { where: { id: id } })
}

// Delete series by id
async function deleteSeries(id) {
    return Series.destroy({ where: { id: id } })
}

module.exports = {
    getAllSeries,
    getSeriesById,
    addSeries,
    updateSeries,
    deleteSeries
} 