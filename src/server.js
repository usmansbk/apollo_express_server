import express, { json, urlencoded } from 'express';
import cors from 'cors';
import { error } from './config/logger';

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => res.status(200).sendFile('public/index.html'));

// Server Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  error(err);
  res.status(500);
  res.send('Something went wrong');
});

export default app;
