const usersDAL = require("../DAL/users.dal");

async function getAllUsers(pageNumber, pageSize) {
    return usersDAL.getAllUsers(pageNumber, pageSize);
}

async function getUserById(id) {
    return usersDAL.getUserById(id)
}

async function getUserWatchedEpisodes(id) {
    return usersDAL.getUserWatchedEpisodes(id)
}

async function deleteWatchedEpisode(userId, episodeId) {
    return usersDAL.deleteWatchedEpisode(userId, episodeId)
}

async function addUser(newUser) {
    return usersDAL.addUser(newUser)
}

async function updateUser(id, updates) {
    return usersDAL.updateUser(id, updates)
}

async function deleteUser(id) {
    return usersDAL.deleteUser(id)
}

module.exports = {
    getAllUsers,
    getUserById,
    getUserWatchedEpisodes,
    deleteWatchedEpisode,
    addUser,
    updateUser,
    deleteUser
}