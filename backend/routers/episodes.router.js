// const express = require("express");

// const router = express.Router();

// const episodesController = require('../controllers/episodes.controller')

// router.get('/', episodesController.getAllEpisodes);

// router.get('/:id', episodesController.getEpisodeById);

// router.post('/', episodesController.addEpisode);

// router.post('/addWatch', episodesController.addWatch);

// router.patch('/:id', episodesController.updateEpisode);

// router.delete('/:id', episodesController.deleteEpisode);


// module.exports = router;




const express = require("express");
const router = express.Router();
const episodesController = require('../controllers/episodes.controller');

// קבלת כל הפרקים
router.get('/', episodesController.getAllEpisodes);

// קבלת פרק לפי ID
router.get('/:id', episodesController.getEpisodeById);

// קבלת פרקים לפי seriesId
router.get('/:seriesId/episodes', episodesController.getEpisodesBySeriesId);

// הוספת פרק חדש לעונה
router.post('/', episodesController.addEpisodes);

router.post('/addWatch', episodesController.addWatch);

router.get('/:id/users', episodesController.getUsersWhoWatched);

// עדכון פרק לפי ID
router.patch('/:id', episodesController.updateEpisode);

// מחיקת פרק לפי ID
router.delete('/:id', episodesController.deleteEpisode);

module.exports = router;

