const express = require("express");

const router = express.Router();

const usersController = require('../controllers/users.controller')

router.get('/', usersController.getAllUsers);

router.get('/:id', usersController.getUserById);

router.get("/:id/watched", usersController.getUserWatchedEpisodes);

router.delete('/:userId/watched/:episodeId', usersController.deleteWatchedEpisode);

router.post('/', usersController.addUser);

router.patch('/:id', usersController.updateUser);

router.delete('/:id', usersController.deleteUser);


module.exports = router;
