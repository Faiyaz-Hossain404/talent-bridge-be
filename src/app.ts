import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import db from './models';
import env from './config/env';

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
    // For first run only: sync({ alter: true }) or migrations preferred
    // await db.sequelize.sync({ alter: true });
  } catch (err) {
    console.error('DB connection failed', err);
  }
})();

export default app;
