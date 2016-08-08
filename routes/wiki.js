var express = require('express');
var wikiRouter = express.Router();

var bodyparser = require('body-parser');
wikiRouter.use(bodyparser.urlencoded({
    extended:true
}));
wikiRouter.use(bodyparser.json());

wikiRouter.get('/', function(req,res){
    res.redirect('/')
});

wikiRouter.get('/add', function(req,res){
    res.render('addpage');
});

var models = require('../models');
var Page = models.Page; 
var User = models.User; 

wikiRouter.post('/', function(req, res, next) {

  // STUDENT ASSIGNMENT:
  // add definitions for `title` and `content`
  console.log(req.body.title);
  var page = Page.build({
    title: req.body.title,
    content: req.body.textArea
  });

  // STUDENT ASSIGNMENT:
  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise or it can take a callback.
  page.save();
  // -> after save -> res.redirect('/');
});


module.exports = wikiRouter;