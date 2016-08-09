var express = require('express');
var morgan = require('morgan');
var swig = require('swig');
var logger = morgan('dev');
var wikiRouter = require('./routes/wiki');
var models = require('./models/')

var app = express();


models.User.sync({})
    .then(function() {
        models.Page.sync({force: true})
    })
    .then(function() {
        app.listen(3001, function() {
            console.log('Server is lsitening on port 3001')
        })
    }).catch(console.error);

app.use(express.static('public'));

module.exports = app;
app.use(logger);
app.use('/wiki', wikiRouter);

// point res.render to the proper directory
app.set('views', __dirname + '/views');
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files
// have it use swig to do so
app.engine('html', swig.renderFile);
// turn of swig's caching
swig.setDefaults({cache: false});

app.listen(3000);

