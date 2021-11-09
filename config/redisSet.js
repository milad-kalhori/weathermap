const Redis = require('ioredis');
const catchAsync = require('../utils/catchAsync');

const redisDemo = catchAsync(async (info) => {

    // Connect to Redis at 127.0.0.1, port 6379.
    const redisClient = new Redis({
        host: '127.0.0.1',
        port: 6379,
    });

    const {weather,wind,clouds}  = info.data;

    let array = [];
    if(array.length >= 10) {
        array.shift();
    } else {
        const d = new Date();
        let createdAt = d.getTime();
        array.push({weather,wind,clouds,createdAt});
    }

    // Set key "myname" to have value "Simon Prickett".
    await redisClient.set('weather',array);

});

module.exports = redisDemo;