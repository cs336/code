/**
 * Sample server for CS 336, Unit 4
 * This implements an application server for some HTTP cookie exercises.
 * Exercise using Chrome:
 *     Find the cookie by typing document.cookie in the Chrome developer tools console.
 * or curl
 *     curl localhost:3000[/set|/clear]
 *
 * @author kvlinden
 * @version summer2016
 */

const express = require('express')
const cookieParser = require('cookie-parser')
const app = express();

app.set('port', (process.env.PORT || 3000));

app.use(cookieParser());

app.get('/', function(req, res) {
    res.send('Cookies: ' + req.cookies.cookieName);
});

app.get('/set', function(req, res) {
    res.cookie('cookieName', 'cookieValue')
    res.send('Cookie is set.');
});

app.get('/clear', function(req, res) {
    res.clearCookie('cookieName');
    res.send('Cookie is deleted.');
});

var server = app.listen(app.get('port'), function() {
    console.log('Listening on port %s...', app.get('port'));
});
