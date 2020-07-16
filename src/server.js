import express, { json, urlencoded } from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(express.static('docs'));

app.get('/', (_req, res) => res.status(200).sendFile('docs/index.html'));

export default app;
