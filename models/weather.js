const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema(
    {
        name : {
            type : String,
            require : [true,'please provide add name'],
            uniq : true,
            trim : true
        },
        weather : [
            {
              id : Number,
              main : String,
              description : String,
              icon : String
            }
          ],
        wind : {
            speed : Number,
            deg : Number
        },
        clouds : {
            all: Number
          },
          createdAt: {
            type: Date,
            default: Date.now
          }
    
});


const Weather = mongoose.model('Weather',weatherSchema);

module.exports = Weather;