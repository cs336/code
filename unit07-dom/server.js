/**
 * This implements an application server for static files using Node/Express.
 * Run it by using 'node app.js' and GETing localhost:3000.
 *
 * @author kvlinden
 * @version summer2016
 */

const express = require('express')
const app = express();
const bodyParser = require('body-parser');

app.set('port', (process.env.PORT || 3000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/fetch/:username', function(req, res) {
    res.send('data for ' + req.params.username);
});

var server = app.listen(app.get('port'), function() {
    console.log('Listening on port %s...', app.get('port'));
});
