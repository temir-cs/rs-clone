require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('./logger/Logger');

const db = require('./db/utils');
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.post('/signup', async (req, res) => {
  try {
    const results = await db.createUser(req.body);
    res.status(201).json({ status: 'ok' });
  } catch (e) {
    logger.error(e);
    res.status(201).json({ status: 'no' });
  }
});

app.post('/signin', async (req, res) => {
  try {
    const user = await db.getUser(req.body);

    if (user.length) {
      res.status(201).json({ status: 'ok' });
    } else {
      res.status(201).json({ status: 'no' });
    }
  } catch (e) {
    logger.error(e);
    res.status(201).json({ status: 'no' });
  }
});

app.get('/leaderboard', async (req, res) => {
  try {
    const scores = await db.getScores();
    res.status(200).json(scores);
  } catch (e) {
    logger.error(e);
    res.status(201).json({ status: 'no' });
  }
});

app.post('/leaderboard', async (req, res) => {
  try {
    const scores = await db.setScore(req.body);
    res.status(200).json(scores);
  } catch (e) {
    logger.error(e);
    res.status(201).json({ status: 'no' });
  }
});

app.listen(port, () => {
  console.log('Server is started at port ' + port);
});
