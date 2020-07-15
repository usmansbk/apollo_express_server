import express, { json, urlencoded } from 'express';
import cors from 'cors';
import logger from './config/logger';

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(express.static('docs'));

app.get('/', (req, res) => res.status(200).sendFile('docs/index.html'));

// Server Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  logger.error(err);
  res.status(500).json({
    error: {
      message: 'Something went wrong from our side',
    },
  });
});

export default app;
