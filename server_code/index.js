const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./db/utils');
const cors = require('cors');

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.post('/signup', async (req, res) => {
  let results;
  try {
    results = await db.createUser(req.body);
  } catch (e) {
    res.status(201).json({ status: 'no' });
  }
  if (results) {
    res.status(201).json({ status: 'ok' });
  }
});

app.post('/signin', async (req, res) => {
  let user;
  try {
    user = await db.getUser(req.body);
  } catch (e) {
    console.log(e);
    res.status(201).json({ status: 'no' });
  }
  if (user && user.length) {
    res.status(201).json({ status: 'ok' });
  } else {
    res.status(201).json({ status: 'no' });
  }
});

app.get('/leaderboard', async (req, res) => {
  const scores = await db.getScores();
  res.status(200).json(scores);
});

app.post('/leaderboard', async (req, res) => {
  const scores = await db.setScore(req.body);
  res.status(200).json(scores);
});

app.listen(port, () => {
  console.log('Server is started at port ' + port);
});
