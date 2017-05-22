var Express = require('express'),
    fs      = require('fs'),
    app     = module.exports.app = Express();
    eps     = require('ejs'),
    morgan  = require('morgan'),
    http    = require('http');

Object.assign=require('object-assign');


app.engine('html', require('ejs').renderFile);
app.use(morgan('combined'))

//console.log(process.env);

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8000,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',
    mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL,
    mongoURLLabel = "";

console.log("mongoURL : " + mongoURL);
console.log("process.env.DATABASE_SERVICE_NAME : " + process.env.DATABASE_SERVICE_NAME);


if (mongoURL == null && process.env.DATABASE_SERVICE_NAME) {
  var mongoServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase();
      console.log("mongoServiceName : " + mongoServiceName);
      var mongoHost = process.env[mongoServiceName + '_SERVICE_HOST'],
      mongoPort = process.env[mongoServiceName + '_SERVICE_PORT'],
      mongoDatabase = process.env[mongoServiceName + '_DATABASE'],
      mongoPassword = process.env[mongoServiceName + '_PASSWORD']
      mongoUser = process.env[mongoServiceName + '_USER'];

  if (mongoHost && mongoPort && mongoDatabase) {
    mongoURLLabel = mongoURL = 'mongodb://';
    if (mongoUser && mongoPassword) {
      mongoURL += mongoUser + ':' + mongoPassword + '@';
    }
    // Provide UI label that excludes user id and pw
    mongoURLLabel += mongoHost + ':' + mongoPort + '/' + mongoDatabase;
    mongoURL += mongoHost + ':' +  mongoPort + '/' + mongoDatabase;

  }

  console.log(mongoURL);

}
var db = null,
    dbDetails = new Object();

var initDb = function(callback) {
  if (mongoURL == null) return;

  var mongodb = require('mongodb');
  if (mongodb == null) return;

  mongodb.connect(mongoURL, function(err, conn) {
    if (err) {
      callback(err);
      return;
    }

    db = conn;
    dbDetails.databaseName = db.databaseName;
    dbDetails.url = mongoURLLabel;
    dbDetails.type = 'MongoDB';

    console.log('Connected to MongoDB at: %s', mongoURL);
  });
};


app.get('/', function (req, res) {
  // try to initialize the db on every request if it's not already
  // initialized.
  if (!db) {
    initDb(function(err){});
  }
  if (db) {
    var col = db.collection('counts');
    // Create a document with request IP and current time of request
    col.insert({ip: req.ip, date: Date.now()});
    col.count(function(err, count){
      res.render('index.html', { pageCountMessage : count, dbInfo: dbDetails, io : io });
    });
  } else {
    res.render('index.html', { pageCountMessage : null});
  }
});

app.get('/pagecount', function (req, res) {
  // try to initialize the db on every request if it's not already
  // initialized.
  if (!db) {
    initDb(function(err){});
  }
  if (db) {
    db.collection('counts').count(function(err, count ){
      res.send('{ pageCount: ' + count + '}');
    });
  } else {
    res.send('{ pageCount: -1 }');
  }
});

app.get('/readme', function(req,res){
  if (!db) {
    initDb(function(err){});
  }
  if (db) {
    var col = db.collection('counts');
    // Create a document with request IP and current time of request
    col.insert({ip: req.ip, date: Date.now()});
    col.count(function(err, count){
      res.render('readme.html', { pageCountMessage : count, dbInfo: dbDetails });
    });
  } else {
    res.render('readme.html', { pageCountMessage : null});
  }
});

// error handling
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something bad happened!');
});

initDb(function(err){
  console.log('Error connecting to Mongo. Message:\n'+err);
});

var server = http.createServer(app);
var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {

  console.log("je suis connecté !");

  socket.on('jsonState', function (state) {
    console.log("server json State!");
    socket.state = state;
    socket.broadcast.emit('jsonState', state);
  });
  socket.on('jsonRoller', function (roller) {
    console.log("server json Roller!");
    socket.roller = roller;
    socket.broadcast.emit('jsonRoller', roller);
  });

});

//app.listen(port, ip);
server.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

app.use(Express.static('public'));

app.use('/vendors', Express.static(__dirname + '/node_modules/noty/lib/'));
app.use('/vendors', Express.static(__dirname + '/node_modules/animejs//'));
app.use('/vendors', Express.static(__dirname + '/node_modules/sweetalert/dist/'));
app.use('/vendors', Express.static(__dirname + '/node_modules/rivets/dist/'));

module.exports = app ;
