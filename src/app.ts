import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/index.js';
import db from './models/index.js';
import env from './config/env.js';

const app = express();
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);

// simple health
app.get('/', (req, res) => res.json({ ok: true }));

// connect DB (do not sync in production)
(async () => {
  try {
    await db.sequelize.authenticate();
    console.log('DB connected');

  } catch (err) {
    console.error('DB connection failed', err);
  }
})();

export default app;
