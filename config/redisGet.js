const Redis = require('ioredis');
const catchAsync = require('../utils/catchAsync');

const redisDemo = catchAsync(async (response) => {
    // Connect to Redis at 127.0.0.1, port 6379.
    const redisClient = new Redis({
        host: '127.0.0.1',
        port: 5000,
    });

    const {start,end} = req.body;
    
    // Get the value held at key "myname" and log it.
    const value = await redisClient.get('weather');
    
    const data = value.filter((item)=>{
        return ((start<item.createdAt) && (end>item.createdAt) ) 
    })

    console.log(data);

    // Disconnect from Redis.
    redisClient.quit();
});

module.exports = redisDemo;