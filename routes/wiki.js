var express = require('express');
var wikiRouter = express.Router();

var bodyparser = require('body-parser');
wikiRouter.use(bodyparser.urlencoded({
    extended:true
}));
wikiRouter.use(bodyparser.json());


wikiRouter.get('/add', function(req,res){
    res.render('addpage');
});

var models = require('../models');
var Page = models.Page; 
var User = models.User; 

wikiRouter.post('/', function(req, res, next) {

  // STUDENT ASSIGNMENT:
  // add definitions for `title` and `content`

  var page = Page.build({
    title: req.body.title,
    content: req.body.textArea,
    authorName: req.body.authorName
  });

    var user = User.build({
        name: req.body.authorName,
        email: req.body.authorEmail
    });

    user.save().then(function(result){
        console.log('user saved');
    })
  // STUDENT ASSIGNMENT:
  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise or it can take a callback.
  page.save()
  .then(function(result){
      res.redirect(result.route);
  });


  
  // -> after save -> res.redirect('/');
});

wikiRouter.get('/', function(req,res){
    Page.findAll({})
    .then(function(foundPages){
        console.log(foundPages);
        res.render('index', {pages: foundPages});
    })
});

wikiRouter.get('/:urlTitle', function(req, res, next){
    console.log(req.params);
    Page.findOne({
        where: {
            urlTitle: req.params.urlTitle
        }
    })
    .then(function(foundPage){
        console.log(foundPage)
        res.render('wikipage', {title: foundPage.title, content: foundPage.content, authorName: foundPage.authorName});
    })
    .catch(next);

});

module.exports = wikiRouter;