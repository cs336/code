/**
 * This implements some examples using jQuery and AJAX.
 */

const express = require("express")
const app = express();
const http_status = require("http-status-codes");
const bodyParser = require("body-parser")

const HOST = "localhost";
const PORT = 3000;

app.use(express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
    res.send("Hello, Class 7!");
});

app.get("/fetch", function(req, res) {
    res.send({"content" : "Did we mention that " + req.query.name + "&rsquo;s free!"});
});

app.get("/fetch2", function(req, res) {
    res.send({"content" : "Did we mention that it&rsquo;s free!"});
});

app.listen(PORT, HOST, () => {
    console.log("listening on " + HOST + ":" + PORT + "...");
});

