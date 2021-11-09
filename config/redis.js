const Redis = require('ioredis');
const catchAsync = require('../utils/catchAsync');

const redisDemo = catchAsync(async (response) => {
    // Connect to Redis at 127.0.0.1, port 6379.
    const redisClient = new Redis({
        host: '127.0.0.1',
        port: 6379,
    });

    const {weather,wind,clouds} = response.data;

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


module.exports = redisDemo;