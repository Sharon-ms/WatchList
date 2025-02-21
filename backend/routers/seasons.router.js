const express = require("express");
const router = express.Router();
const seasonsController = require('../controllers/seasons.controller');

router.get('/', seasonsController.getAllSeasons);

router.get('/:seriesId', seasonsController.getSeasonsBySeriesId);

router.post('/', seasonsController.addSeason);

router.patch('/:id', seasonsController.updateSeason);

router.delete('/:id', seasonsController.deleteSeason);

module.exports = router;
