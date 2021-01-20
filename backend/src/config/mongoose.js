const mongoose = require('mongoose');
const { mongo } = require('./vars');

mongoose.connection.on('error', (err) => {
  console.log(`MongoDB connection error: ${err}`);
  process.exit(-1);
});

exports.connect = () => {
  mongoose
    .connect(mongo.uri, {
      useCreateIndex: true,
      keepAlive: 1,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(async () => {
      console.log('mongo db connected');
    });
  return mongoose.connection;
};
