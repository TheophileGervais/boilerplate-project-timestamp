// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

// Timestamp app
app.get('/api/:date', (req, res) => {
  const dateString = req.params.date;

    if (!dateString) {
      date = new Date();
    }
    // Check if the input is in Unix timestamp format
    else if (!isNaN(dateString)) {
      // Convert the input to a number and create a Date object
      date = new Date(parseInt(dateString)); 
    } 
    else { 
      // If dateString is a valid date string, parse it
      if (!isNaN(Date.parse(dateString))) {
      date = new Date(dateString);
    } else {
        // If dateString is not a valid date string, return an error response
        return res.status(400).json({ error: 'Invalid date' });
    }}
  // Generate the JSON response with the Unix timestamp and UTC string
  res.json({ unix: date.getTime(), utc: date.toUTCString() });
});