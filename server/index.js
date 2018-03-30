const Express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
// Register models
require('./models');
const bodyParser = require('body-parser');
const path = require('path');
const serverConfig = require('./config');
const dummyData = require('./dummyData');

// Initialize the Express App
const app = new Express();

// MongoDB Connection
mongoose.connect(serverConfig.mongoURL, (error) => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw error;
  }

  // feed some dummy data in DB.
  dummyData();
});

// const required modules
const routes = require('./routes');

// Apply body Parser and server public assets and routes
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use(session({ secret: 'guitar flute', resave: false, saveUninitialized: true, }));
app.use('/static', Express.static(path.resolve(__dirname, '../client/dist')));
app.use('/api', routes);

app.get('/logout', function(req, res) {
    if (req.session.user)
        req.session.user = null;
    res.sendFile(path.resolve(__dirname + '/../client/dist/index.html'));
});

app.get('*', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../client/dist/index.html'));
    // res.sendFile('../client/dist/index.html', {root: __dirname })
});

// start app
app.listen(serverConfig.port, (error) => {
  if (!error) {
    console.log(`Server is up at ${serverConfig.port}`);
  }
});

module.exports = app;
