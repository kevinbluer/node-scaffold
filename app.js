// for express
var express = require('express');
var mongoose = require('mongoose');

// create the express instance
var app = module.exports = express.createServer();

var Entity = require('./models/entity.js');

// configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({ secret: "scaffold session" }))
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

// environment configuration
app.configure('development', function(){
  mongoose.connect('mongodb://localhost/test');
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

});

app.configure('production', function(){
  mongoose.connect('mongodb://flocate:fl0cat3@staff.mongohq.com:10043/flocate');
    app.use(express.errorHandler());

});

// ******************
// register endpoints
// ******************

app.get('/', function(req, res) {
	
  Entity.find({type: "entity"}, function(err, items) {

  	res.render('index.ejs', { 
      layout: true,
      items: items
    });
  	
  });

})

app.get('/upload', function(req, res) {
  
  res.render('upload.ejs', { 
    layout: true,
  });
  
})

app.get('/map', function(req, res) {

  Entity.find({type: "entity"}, function(err, items) {

    res.render('map.ejs', { 
      layout: true,
      items: items
    });
    
  });

});

app.post('/api/entity/add', function(req, res) {

    var what = req.body.what;
    var detail = req.body.detail;
    var resources = req.body.resources;
    var where = req.body.where;
    var when = req.body.when;
    var who = req.body.createdby;

    var entity = new Entity({

      what: what,
      detail: detail,
      resources: resources,
      where: where,
      when: when,
      who: who,
      created: { type: Date, default: Date.now }

    });

    entity.save(function(err, new_entity) {

      if (err) {
        console.log(err);
        res.send({"saved": "nope"});
      }
      else {
        console.log(new_entity);
        res.send({"saved": "yep"});  
      }
      

    });

});

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Flocate is Listening on " + port);
});