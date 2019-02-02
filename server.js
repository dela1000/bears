const express = require('express')
const app = express();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const routes = require('./backend/routes');

app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(bodyParser.json());

app.use('/', routes);
app.use(express.static(path.join(__dirname)));

app.listen(8080, () => console.log('Listening on port 8080'));
