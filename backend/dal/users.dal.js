const { User, Series, Episode } = require('./db');

async function getAllUsers(pageNumber, pageSize) {
    return User.findAll(
        {
            include: [Episode],
            offset: pageNumber * pageSize,
            limit: pageSize
        }
    );
}

async function getUserById(id) {
    return User.findByPk(id, { include: [Episode] })
}

async function addUser(newUser) {
    return User.create(newUser)
}

async function updateUser(id, update) {
    return User.update(update, { where: { id: id } })
}

async function deleteUser(id) {
    return User.destroy({ where: { id: id } })
}

module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser
} 