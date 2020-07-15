const express = require('express');
const cors = require('cors');
const logger = require('./config/logger');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/status', (_, res) => res.status(200).json({
  status: 'good',
  date: new Date().toDateString(),
}));
app.get('/', (req, res) => res.status(200).sendFile('public/index.html'));

// Server Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  logger.error(err);
  res.status(500);
  res.send('Something went wrong');
});

module.exports = app;
