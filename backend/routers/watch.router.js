const express = require("express");
const router = express.Router();
const watchController = require('../controllers/watch.controller');

// קבלת כל הצפיות של משתמשים
router.get('/', watchController.getAllWatchedEpisodes);

// הוספת צפייה חדשה של משתמש בפרק
router.post('/', watchController.addWatch);

// עדכון מצב צפייה (למשל אם צפו או לא)
router.patch('/:id', watchController.updateWatchStatus);

// מחיקת מעקב צפייה
router.delete('/:id', watchController.deleteWatchStatus);

module.exports = router;
