import express, { json, urlencoded } from 'express';

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(express.static('docs'));

app.get('/', (_req, res) => res.status(200).sendFile('docs/index.html'));

export default app;
