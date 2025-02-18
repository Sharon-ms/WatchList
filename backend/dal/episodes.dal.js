const { User, Series, Episode } = require('../dal/db');

async function getAllEpisodes(pageNumber, pageSize) {
    return Episode.findAll(
        {
            include: [Series],
            offset: pageNumber * pageSize,
            limit: pageSize
        }
    );
}

async function getEpisodeById(id) {
    return Episode.findByPk(id, { include: [Series] })
}

async function addEpisode(newEpisode) {
    return Episode.create(newEpisode)
}

async function addWatch(userId, episodeId) {
    const user = await User.findByPk(userId);
    const episode = await Episode.findByPk(episodeId);
    await user.addEpisode(episode);
    return User.findOne({
        where: { id: userId },
        include: [Episode]
    })
}

async function updateEpisode(id, update) {
    return Episode.update(update, { where: { id: id } })
}

async function deleteEpisode(id) {
    return Episode.destroy({ where: { id: id } })
}

module.exports = {
    getAllEpisodes,
    getEpisodeById,
    addEpisode,
    addWatch,
    updateEpisode,
    deleteEpisode
} 