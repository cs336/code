/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var MongoClient = require('mongodb').MongoClient
var assert = require('assert');

var db;

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/api/comments', function(req, res) {
    db.collection("comments").find({}).toArray(function(err, docs) {
	assert.equal(err, null);
        res.json(docs);
    });
});

app.post('/api/comments', function(req, res) {
    var newComment = {
        id: Date.now(),
        author: req.body.author,
        text: req.body.text,
    };
    db.collection("comments").insertOne(newComment, function(err, result) {
	assert.equal(err, null);
        var newId = result.insertedId;
        db.collection("bugs").find({_id: newId}).next(function(err, doc) {
            res.json(doc);
        });
    });
});

app.listen(app.get('port'), function() {
    console.log('Server started: http://localhost:' + app.get('port') + '/');
});

var mongoURL = 'mongodb://cs336:bjarne@ds015995.mlab.com:15995/kvlinden-cs336';
MongoClient.connect(mongoURL, function(err, dbConnection) {
    if (err) {
        throw err;
    }
    db = dbConnection;
});
