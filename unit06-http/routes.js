/**
 * Sample server for CS 336, Unit 4
 * This implements an application server for some HTTP routing exercises.
 * Exercise using curl:
 *    curl -X POST localhost:3000 -d '{"user_message":"value..."}' -H 'Content-Type: application/json'
 *
 * @author kvlinden
 * @version summer2016
 */

const express = require('express')
const app = express();
const bodyParser = require('body-parser')

app.set('port', (process.env.PORT || 3000));

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/', function(req, res) {
    res.send("Hello, POST!<br>Request: " + req.rawHeaders + "<br>Message: " + req.body.user_message);
});

var server = app.listen(app.get('port'), function() {
    console.log('Listening on port %s...', app.get('port'));
});
