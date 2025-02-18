const { User, Series, Episode } = require('./db');

async function getAllSeries(pageNumber, pageSize) {
    return Series.findAll(
        {
            offset: pageNumber * pageSize,
            limit: pageSize
        }
    );
}

async function getSeriesById(id) {
    return Series.findByPk(id)
}

async function addSeries(newSeries) {
    return Series.create(newSeries)
}

async function updateSeries(id, update) {
    return Series.update(update, { where: { id: id } })
}

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