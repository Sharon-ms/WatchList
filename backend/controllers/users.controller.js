const usersService = require('../services/users.service');

async function getAllUsers(req, res) {
    try {
        const { pageNumber, pageSize } = req.query;
        const users = await usersService.getAllUsers(Number(pageNumber), Number(pageSize));
        res.send(users)
    }
    catch (err) {
        res.status(500).send(err.message)
    }

}

async function getUserById(req, res) {
    try {
        const id = Number(req.params.id);
        const user = await usersService.getUserById(id);
        res.send(user)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

async function addUser(req, res) {
    try {
        const newUser = req.body;
        const result = await usersService.addUser(newUser);
        res.send(result)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

async function updateUser(req, res) {
    try {
        const id = req.params.id;
        const updates = req.body;
        const result = await usersService.updateUser(Number(id), updates);
        res.send(result)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

async function deleteUser(req, res) {
    try {
        const id = req.params.id;
        const result = await usersService.deleteUser(Number(id));
        res.json(result)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser
}