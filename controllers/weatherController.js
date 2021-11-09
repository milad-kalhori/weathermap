const Weather = require('../models/weather');
const axios = require('axios');
const catchAsync = require('../utils/catchAsync');
const cron = require('node-cron');
const Redis = require('ioredis');


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
    cron.schedule('*/1 * * * *',catchAsync (async () => {
        console.log('running a task every one minutes');
        const {city} = req.body;
        await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`).then (catchAsync(async function(response) {
            const {weather,wind,clouds} = response.data;

            console.log(weather);
            console.log(wind);
            console.log(clouds);

            const redisDemo = catchAsync(async () => {
                // Connect to Redis at 127.0.0.1, port 6379.
                const redisClient = new Redis({
                    host: '127.0.0.1',
                    port: 6379,
                });

                let array = [];
                if(array.length >= 10) {
                    array.shift();
                } else {
                    array.push({weather,wind,clouds});
                }

                // Set key "myname" to have value "Simon Prickett".
                await redisClient.hmset('weather',array);

                // Get the value held at key "myname" and log it.
                const value = await redisClient.hmget('weather');
                console.log(value);

                // Disconnect from Redis.
                redisClient.quit();
            });

                redisDemo();
            
        }));
    }));
    res.status(200).json({
        success : true,
        msg : 'getTenLatestWeathermap',
    })

});


exports.getWeathermapByTime = catchAsync (async (req,res,next) => {
    
    res.status(200).json({
        success : true,
        msg : 'getWeathermapByTime',
    }) 
});
