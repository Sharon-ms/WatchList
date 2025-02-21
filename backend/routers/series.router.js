// const express = require("express");

// const router = express.Router();

// const seriesController = require('../controllers/series.controller')

// router.get('/', seriesController.getAllSeries);

// router.get('/:id', seriesController.getSeriesById);

// router.post('/', seriesController.addSeries);

// router.patch('/:id', seriesController.updateSeries);

// router.delete('/:id', seriesController.deleteSeries);


// module.exports = router;


const express = require("express");
const router = express.Router();
const seriesController = require('../controllers/series.controller');

// קבלת כל הסדרות
router.get('/', seriesController.getAllSeries);

// קבלת סדרה לפי ID
router.get('/:id', seriesController.getSeriesById);

// הוספת סדרה חדשה (כוללת יצירת עונות ופרקים)
router.post('/', seriesController.addSeries);

// עדכון סדרה לפי ID
router.patch('/:id', seriesController.updateSeries);

// מחיקת סדרה לפי ID
router.delete('/:id', seriesController.deleteSeries);

module.exports = router;


