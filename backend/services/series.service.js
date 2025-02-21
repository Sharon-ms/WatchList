const seriesDAL = require("../dal/series.dal");

async function getAllSeries(pageNumber, pageSize) {
    return seriesDAL.getAllSeries(pageNumber, pageSize);
}

async function getSeriesById(id) {
    return seriesDAL.getSeriesById(id)
}

async function addSeries(newSeries) {
    return seriesDAL.addSeries(newSeries)
}

async function updateSeries(id, updates) {
    return seriesDAL.updateSeries(id, updates)
}

async function deleteSeries(id) {
    return seriesDAL.deleteSeries(id)
}

module.exports = {
    getAllSeries,
    getSeriesById,
    addSeries,
    updateSeries,
    deleteSeries
}