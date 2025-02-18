const usersDAL = require("../DAL/users.dal");

async function getAllUsers(pageNumber, pageSize) {
    return usersDAL.getAllUsers(pageNumber, pageSize);
}

async function getUserById(id) {
    return usersDAL.getUserById(id)
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
    addUser,
    updateUser,
    deleteUser
}