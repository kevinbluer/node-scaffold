// for express
var express = require('express');

// create the express instance
var app = module.exports = express.createServer();

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

// ******************
// register endpoint
// ******************

app.get('/', function(request, response) {

	response.send('hello world');
});

app.get('/test', function(req, res) {
	
	res.render('test.ejs', { layout: true });
	
})

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Scaffold is Listening on " + port);
});

/*
// Production: NODE_ENV=production node ex_express.js 
// Development: NODE_ENV=development node ex_express.js 
var express = require('express'),  
     app = express.createServer(); 
app.configure(function(){ 
     app.use(express.logger());  
 app.use(express.methodOverride()); 
 app.use(app.router); 
 app.use(express.static(__dirname + '/public')); 
     app.set('views', __dirname + '/views');  
     app.set('view engine', 'ejs'); 
}); 
app.configure('development', function(){ 
 app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
}); 
app.configure('production', function(){ 
 app.use(express.errorHandler()); 
}); 
// Application.  
app.get('/test', function(req, res) { 
     res.render('test.ejs', {locals: {"api": "user"}});  
});  
app.post('/load/:mode', function(req, res) { 
     // console.dir(req);  
     var body = "<h1>Load</h1>";  
     body += req.params.mode + "\n" 
     body += req.param("workers") + "\n" 
     res.send(body);  
}); 
app.listen(3000);  
console.log("Public Dir: " + __dirname + '/public');  
console.log("Service Started at " + 3000);
*/