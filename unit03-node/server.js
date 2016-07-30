/**
 * Sample server for CS 336, Unit 3 - Run with either:
 *    npm start
 *    node script.js
 *
 * @author kvlinden
 * @version summer2016
 */

const express = require('express');
const app = express();

app.set('port', (process.env.PORT || 3000));

// route code here...

app.listen(app.get('port'), function () {
    console.log('Example app listening on port ' + app.get('port') + '!');
});
