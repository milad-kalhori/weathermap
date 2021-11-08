const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({path:'./config/config.env'});

const DB = process.env.DATABASE_LOCAL;

mongoose.connect(DB, {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  })
  .then(() => console.log('DB connection successful!'));

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT,()=>{
    console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT} `);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    // Close server & exit process
    server.close(() => process.exit(1));
  });
  