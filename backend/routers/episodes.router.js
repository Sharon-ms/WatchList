const express = require("express");

const router = express.Router();

const episodesController = require('../controllers/episodes.controller')

router.get('/', episodesController.getAllEpisodes);

router.get('/:id', episodesController.getEpisodeById);

router.post('/', episodesController.addEpisode);

router.post('/addWatch', episodesController.addWatch);

router.patch('/:id', episodesController.updateEpisode);

router.delete('/:id', episodesController.deleteEpisode);


module.exports = router;
