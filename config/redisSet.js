const Redis = require('ioredis');
const catchAsync = require('../utils/catchAsync');
const Promise = require('bluebird');
const socketClient = require('./socketClient');


const redisDemo = (info,array) => {
    return new Promise (catchAsync((async (resolve,reject)=>{
        // Connect to Redis at 127.0.0.1, port 6379.
        const redisClient = new Redis({
            host: '127.0.0.1',
            port: 6379,
     });

        const {weather,wind,clouds}  = info.data;

        if(array.length >= 10) {
          array.shift();
        } else {
            const d = new Date();
            let createdAt = d.getTime();
            array.push({weather,wind,clouds,createdAt});
        }

        // Set key "myname" to have value "Simon Prickett".
        await redisClient.set('weather',JSON.stringify(array));

        console.log("array",array);

        const n = array.length - 1;
        const m = array.length - 2;

        // 10
        if (array.length >= 2 && array[n].wind.speed === array[m].wind.speed){
            socketClient();
        }

        return resolve(array);

    })))

};

module.exports = redisDemo;