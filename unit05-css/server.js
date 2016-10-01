/**
 * This implements an application server for static files using Node/Express.
 *
 * @author kvlinden
 * @version summer2016
 */

const express = require('express')
const app = express();
const serveIndex = require('serve-index');

const PORT = 3000;

app.use(serveIndex('public'));
app.use(express.static('public'));

app.listen(PORT, function() {
    console.log('Listening on port ' + PORT + '...');
});
