var express = require("express");

var app = express();

// Set port
app.set('port', process.env.PORT || 8080);

/* Redirect the user based on a given key. 
 * pattern /[key]
 * 
 *  - what if the key is not found
 *  - http vs https
 *  - should we check the redirect url before sending them off? - no because that's not our wheelhouse
 *  - look locally for the key before hitting redis
 *  - how to use an interface for looking up keys vs knowing we are using redis v mysql v etc. 
 */
app.get('/:key', function(request, response) {
    console.log("request : " + request.params.key);
    response.redirect('https://www.google.com/?q=' + request.params.key);
});

/* local memory store of requested urls */

/* method to refresh or clear local memory store
 *  /m/clear
 */
app.get('/m/clear', function(reqest, response) {
    console.log('clearing the cache');
    response.end("cache cleared.");
});

/* call to redis to lookup a url based on the given key
 * take a given url and return a key
 * /g/[encoded url]
 */
app.get('/g/:url', function(request, response) {
    response.end('1234567');
});

/*take a given url and key - if key is unique associate and return the key
 * if not unique return a unique key based on the given key.
 * /gk/[encoded url]/key
 */
app.get('/gk/:url/:key', function(request, response) {
    response.end('your key: ' + request.params.key );
});

/* take a key and url to update the url
 *  /u/[key]/[encoded url]
 */
app.get('/u/:key/:url', function(request, response) {
    response.end("URL: updated " + request.params.url + " for key " + request.params.key);
});

/* start up the server */
app.listen(app.get('port'), function() {
    console.log('Server started on localhost:' + app.get('port') + '; Press Ctrl-C to terminate.');
});
