/**
 * Sample (Node.js, non-Express) server for CS 336, Unit 3 - Run with either:
 *    node script.js
 *    npm start
 *
 * @author kvlinden
 * @version summer2016
 */

const http = require('http');
const http_status = require('http-status-codes');

const HOST = "127.0.0.1";
const PORT = 3000;

const server = http.createServer((req, res) => {
    if (req.url == '/hello') {
        res.writeHead(http_status.OK, {'Content-Type': 'text/plain'});
        res.end('Hello, node!');
    } else {
        res.writeHead(http_status.NOT_FOUND, {'Content-Type': 'text/plain'});
        res.end();
    }
})

server.listen(PORT, HOST, () => {
    console.log('Server running on port ' + PORT + '.');
});

// Load/Invoke a function from a custom module.
let my_module = require('./module');
console.log(my_module.my_function());
