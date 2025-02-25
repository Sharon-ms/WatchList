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

async function getUserWatchedEpisodes(req, res) {
    try {
        const { id } = req.params;
        console.log("Fetching watched episodes for user:", id);

        const episodes = await usersService.getUserWatchedEpisodes(id);

        if (episodes.error) {
            return res.status(404).json({ message: episodes.error });
        }

        res.json(episodes);
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}


const deleteWatchedEpisode = async (req, res) => {
    const { userId, episodeId } = req.params;

    try {
        const result = await usersService.deleteWatchedEpisode(userId, episodeId);
        if (result) {
            return res.status(200).json({ message: "Watch record deleted successfully" });
        }
        return res.status(404).json({ message: "Watch record not found" });
    } catch (error) {
        console.error("Error removing watch record:", error);
        res.status(500).json({ message: "Server error" });
    }
};


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
    getUserWatchedEpisodes,
    deleteWatchedEpisode,
    addUser,
    updateUser,
    deleteUser
}