const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database');
const saveEntry = require('../database/controllers').saveEntry;
const getEntries = require('../database/controllers').getEntries;

const app = express();
const PORT = 3010;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/../client/dist'));

app.put('/entries', saveEntry);

app.get('/entries', getEntries);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
