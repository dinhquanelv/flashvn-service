const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const db = require('./src/config/db');
const routes = require('./src/routes');
const errorHandling = require('./src/middleware/errorHandling');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// connect database
db.connect();

// apply library
app.use(
  cors({
    origin: process.env.BASE_URL || 'http://localhost:3000', // port fe
    credentials: true, // allow call api
  }),
);
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

app.head('/ping', (req, res) => {
  res.sendStatus(200);
});

// handle routes
routes(app);

// handle error
app.use(errorHandling);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
