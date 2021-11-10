const Weather = require('../models/weather');
const axios = require('axios');
const catchAsync = require('../utils/catchAsync');
const cron = require('node-cron');
const redisDemoSet = require('../config/redisSet');
const redisDemoGet = require('../config/redisGet');
const redisDemoGet2 = require('../config/redisGet2');

const API_key ="b45da14dc267921b9f079b759ee57d02";

exports.getNowWeathermap = catchAsync (async (req,res,next) => {
    const {city} = req.body;
    await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`).then(catchAsync(async function(response) {

    const {weather,wind,clouds} = response.data;

      console.log(weather);
      console.log(wind);
      console.log(clouds);

      const data = await Weather.create({
        weather,
        wind,
        clouds
        });
    }));
    res.status(200).json({
        success : true,
        msg : 'getNowWeathermap'
    })
});

exports.getTenLatestWeathermap = catchAsync (async (req,res,next) => {
    let data;
    let array = [];
    cron.schedule('*/20 * * * * *',catchAsync (async () => {
        console.log('running a task every one minutes');
        const {city} = req.body;
        await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`).then (catchAsync(async function(response) {

            const {weather,wind,clouds} = response.data;

            console.log(weather);
            console.log(wind);
            console.log(clouds);

            // connect to redis
            redisDemoSet(response,array);

        }));
    }));

        const value =  await redisDemoGet2();

        res.status(200).json({
            success : true,
            msg : 'getTenLatestWeathermap',
            data : value
        })
});


exports.getWeathermapByTime = catchAsync (async (req,res,next) => {

    // connect to redis
    const data =  await redisDemoGet(req);

    res.status(200).json({
        success : true,
        msg : 'getWeathermapByTime',
        data : data
    })
});


