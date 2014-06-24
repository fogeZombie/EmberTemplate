var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');

var app = express();

// configure
app.configure(function() {
    app.set('port', process.env.PORT || 1337);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(express.static(__dirname));
app.use(app.router);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// server
http.createServer(app).listen(app.get('port'), function() {
    console.log("Express server listening on port: " + app.get('port'));
});

module.exports = app;
