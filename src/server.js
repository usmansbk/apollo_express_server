import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';

require('dotenv').config();

const app = express();

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(express.static('docs'));

app.get('/', (_req, res) => res.status(200).sendFile('docs/index.html'));

export default app;
