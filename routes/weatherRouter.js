const express = require ('express');
const {
    getNowWeathermap,
    getTenLatestWeathermap,
    getWeathermapByTime
} = require('../controllers/weatherController');

const router = express.Router();

router.get('/now',getNowWeathermap);
router.get('/tenlatest',getTenLatestWeathermap);
router.get('/time',getWeathermapByTime);


module.exports = router;
