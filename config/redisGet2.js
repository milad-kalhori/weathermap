const Redis = require('ioredis');
const catchAsync = require('../utils/catchAsync');
const Promise = require('bluebird');


const redisDemo = () => {
    return new Promise (catchAsync((async(resolve,reject)=>{
        // Connect to Redis at 127.0.0.1, port 6379.
        const redisClient = new Redis({
            host: '127.0.0.1',
            port: 6379,
        });

        // Get the value held at key "myname" and log it.
        const value = await redisClient.get('weather');

        console.log(value);

        return resolve(value);
    })))
};

module.exports = redisDemo;