const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const routes = require('./routes/v1');
const strategies = require('./config/passport');
const error = require('./middlewares/error');
const { port, env } = require('./config/vars');
const mongoose = require('./config/mongoose');

const app = express();
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(passport.initialize());
passport.use('jwt', strategies.jwt);
app.use('/api/v1', routes);
app.use(error.converter);
app.use(error.notFound);
app.use(error.handler);

app.listen(port, () => console.log(`server started on port ${port} (${env})`));
mongoose.connect();

module.exports = app;
