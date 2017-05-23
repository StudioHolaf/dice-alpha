var Express = require('express'),
    fs      = require('fs'),
    app     = module.exports.app = Express();
    eps     = require('ejs'),
    morgan  = require('morgan'),
    http    = require('http');

Object.assign=require('object-assign');
app.engine('html', require('ejs').renderFile);
app.use(morgan('combined'))

/* ------------------------------------------------------------ OPENSHIFT CONFIGURATION ------------------------------------------------------------ */

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8000,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';


/* ------------------------------------------------------------ ERROR HANDLING ------------------------------------------------------------ */

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something bad happened!');
});

/* ------------------------------------------------------------ SOCKET ------------------------------------------------------------ */

var server = http.createServer(app);
io = require('socket.io').listen(server);
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

/* ------------------------------------------------------------ ROUTES ------------------------------------------------------------ */

var routes = require( './db' );

var routes = require( './routes/' );
app.get('/', routes.index);
app.get('/match/:idj1:idj2', routes.match);
app.get('/pagecount', routes.pagecount);

//app.listen(port, ip);
server.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

/* ------------------------------------------------------------ ASSETS ------------------------------------------------------------ */

app.use(Express.static('public'));
app.use('/vendors', Express.static(__dirname + '/node_modules/noty/lib/'));
app.use('/vendors', Express.static(__dirname + '/node_modules/animejs//'));
app.use('/vendors', Express.static(__dirname + '/node_modules/sweetalert/dist/'));
app.use('/vendors', Express.static(__dirname + '/node_modules/rivets/dist/'));

module.exports = app ;
