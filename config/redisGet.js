const Redis = require('ioredis');
const catchAsync = require('../utils/catchAsync');

const redisDemo = catchAsync(async (req) => {
    // Connect to Redis at 127.0.0.1, port 6379.
    const redisClient = new Redis({
        host: '127.0.0.1',
        port: 6379,
    });
    
    const {start,end} = req.body;

    // Get the value held at key "myname" and log it.
    const value = await redisClient.get('weather');

    const data =JSON.parse(value).filter((item) => {return (start<=item.createdAt) && (end>=item.createdAt)})
   
    console.log(data);
});

module.exports = redisDemo;