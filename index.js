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

// Data API
app.get("/api", (req, res) =>{
  let today = new Date();
  let todayString = today.toUTCString();
  res.json({"unix": today.getTime(), "utc": todayString});
})

app.get("/api/:date", (req, res) =>{
  if(new Date(req.params.date) == "Invalid Date"){
    if(new Date(parseInt(req.params.date)) == "Invalid Date"){
      // Input cannot be processed as date
      res.json({"error": "Invalid Date"});
    } else{
      // Input is Unix time
      let formattedUnix = parseInt(req.params.date);
      let formattedDate = new Date(formattedUnix).toUTCString();
      res.json({"unix": formattedUnix, "utc": formattedDate})
    }
  } else{
      // Input is just a date string
      let formattedDate = new Date(req.params.date).toUTCString();
      res.json({"unix": today.getTime(), "utc": formattedDate})
  }
})



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
