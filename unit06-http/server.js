/**
 * This implements some HTTP cookie and form exercises.
 *
 * @author kvlinden
 * @version summer2016
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

// This responds to GET requests for a hello message.
app.get('/hello', function(req, res) {
    res.send("Hello, Express route!");
});

// This implements routes to list/create/delete cookies.
app.get("/", function(req, res) {
    let cookieMessage = 'cookieName not set...';
    if (req.cookies.cookieName) {
        cookieMessage = "cookieName: " + req.cookies.cookieName;
    }
    res.send("Hello, cookies!<br> " + cookieMessage);
});
app.get("/set", function(req, res) {
    res.cookie("cookieName", "cookieValue")
    res.send("Cookie is set.");
});
app.get("/clear", function(req, res) {
    res.clearCookie("cookieName");
    res.send("Cookie is deleted.");
});

app.listen(PORT, HOST, () => {
    console.log("listening on " + HOST + ":" + PORT + "...");
});
