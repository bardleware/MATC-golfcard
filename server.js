var express = require('express'); //routing
var bodyParser = require('body-parser');//parses json data
var app = express();
var port = process.env.PORT || 8080;
var morgan = require('morgan');//Logs http requests
var path = require('path');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.get('*', function(req, res){
  res.sendFile(path.join(__dirname + "/public/app/views/index.html"));
})

app.listen(port, function () {
  console.log("running the server on port " + port);
});