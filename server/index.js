/* eslint-disable no-console */
const express = require('express');
const spotify = require('./spotify');

const app = express();
app.use(express.json());
app.set('view engine', 'ejs');

app.use('/', express.static('public'));

const resultsMemo = {}

app.get('/spotify', (req, res) => {
  console.log('starting to search for ' + req.query.searchTerm);
  if (resultsMemo[req.query.searchTerm]) {
    res.send(resultsMemo[req.query.searchTerm]);
  } else {
    spotify(req.query.searchTerm, (err, results) => {
      if (err) {
        res.send([]);
        console.error(err);
      } else {
        resultsMemo[req.query.searchTerm] = results
        res.send(results);
      }
    });
  }
});


app.listen(5000, (err) => {
  if (err) {
    console.error(err);
  }
  console.log('http://localhost:5000');
});
