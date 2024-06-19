import express from 'express';
import routes from './src/routes/index.js';

const app = express();

app.use(express.json());
routes(app);

export default app;