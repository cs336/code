/**
 * This implements some HTTP method/code, form and cookie examples.
 */

const express = require('express')
const app = express();
const http_status = require('http-status-codes');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const HOST = "localhost";
const PORT = 3000;

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// --------------------------------
// HTTP route and return code examples.

// This responds to GET requests for a hello message.
app.get('/', function(req, res) {
    res.send("Hello, Express route!");
});

// This rejects access to this "lost" resource.
app.get('/lost', function(req, res) {
    res.sendStatus(http_status.NOT_FOUND);
});

// --------------------------------
// HTTP form example

// Responds to form posts from the forms/index.html example.
app.post('/forms', function(req, res) {
    res.send('Hello, form POST!<br>Posted message: <code>'
	     + req.body.user_message + '</code>');
});

// --------------------------------
// HTTP cookies examples

// This implements routes to list/create/delete cookies.
app.get("/cookies", function(req, res) {
    let cookieMessage = 'cookieName not set...';
    if (req.cookies.cookieName) {
        cookieMessage = "cookieName: " + req.cookies.cookieName;
    }
    res.send("Hello, cookies!<br> " + cookieMessage);
});
app.get("/cookies/set", function(req, res) {
    res.cookie("cookieName", "cookieValue")
    res.send("Cookie is set.");
});
app.get("/cookies/clear", function(req, res) {
    res.clearCookie("cookieName");
    res.send("Cookie is deleted.");
});

app.listen(PORT, HOST, () => {
    console.log("listening on " + HOST + ":" + PORT + "...");
});
