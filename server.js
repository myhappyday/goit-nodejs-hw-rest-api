import mongoose from 'mongoose';

import app from './app.js';

// console.log(process.env);

const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log('Database connection successful');
    });
  })
  .catch(error => {
    console.log(`Database connection failed. Error message: ${error.message}`);
    process.exit(1);
  });
