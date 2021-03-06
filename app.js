
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , draws = require('./routes/draws')
  , http = require('http')
  , path = require('path');

// database 
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/lottery');

var expresshandlebars = require('express3-handlebars');

var app = express();

app.engine('handlebars', expresshandlebars({defaultLayout:'main'}));

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
//app.set('view engine', 'jade');
app.set('view engine', 'handlebars');

//less
app.use(require('less-middleware')({ src: __dirname + '/public' }));

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(req, res){
  res.render('index');
});
app.get('/showdraws', draws.showdraws(db));
app.post('/showdraws', draws.showdraws(db));
app.post('/newdraw', draws.newdraw(db));
app.get('/users', routes.userlist(db));



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
