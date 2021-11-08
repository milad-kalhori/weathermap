const express = require('express');
const morgan = require('morgan');
const weatherRouter = require('./routes/weatherRouter');

const app = express();

app.use(express.json());


if(process.env.NODE_ENV === "development") {
    app.use(morgan('dev'))
}


app.use('/api/v1/7030',weatherRouter)

module.exports = app;
