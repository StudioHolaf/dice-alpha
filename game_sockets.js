var io;
var numUsers = 0;
var players_datas = [];
var players_rolls = {};

var players_status = {};

var utils_player = require( './utils_player' );
var utils_data = require( './utils_data' );

/**
 * This function is called by index.js to initialize a new game instance.
 *
 * @param sio The Socket.IO library
 * @param socket The socket object for the connected client.
 */
exports.initGameSockets = function (sio, socket, addedUser) {
    io = sio;

    var roomid = '1234';
    socket.join(roomid);
    socket.emit('ask_for_login');

    // Host Events

    // Player Events
    socket.on('player_connection', function(datas){playerJoinGame(socket, datas, addedUser)});
    socket.on('player_disconnect', function(datas){playerLeftGame(socket, datas, addedUser)});
    socket.on('player_ready_for_match', function(datas){playerReadyForMatch(socket)});
    socket.on('my_roll_ready', function(datas){myRollReady(socket, datas)});
    socket.on('player_launch_solve', function(){launchSolve(socket)});
}

function playerJoinGame(socket, id, addedUser)
{
    if (addedUser) return;
    ++numUsers;
    console.log("numUsers : "+numUsers);
    socket.userID = id;
    socket.userNumber = numUsers;
    if (numUsers <= 2) {
        db.collection("player").findOne({_id: parseInt(id)}, function (err, player) {
            if (err) throw err;
            utils_player.construct_player(player, function (player) {
                players_datas.push(player);
                socket.emit('player_init', {datas: player});
                if (numUsers == 2) {
                    socket.broadcast.emit('match_init', {datas: players_datas[1]});
                    socket.emit('match_init', {datas: players_datas[0]});
                }
            });
        });
    }
    else if(players_datas.length == 2)
    {
        --numUsers;
        socket.emit('spectator_init', {datas: players_datas});
    }
}

function playerLeftGame(socket, datas, addedUser)
{
    if (addedUser) {
        --numUsers;

        // echo globally that this client has left
        socket.broadcast.emit('user left', {
            username: socket.username
        });
    }
}

function myRollReady(socket, datas)
{
    players_rolls["player_"+socket.userID] = datas;
    socket.broadcast.emit('opponent_roll_ready');
    if(Object.keys(players_rolls).length == 2)
    {
        var encoded_rolls = JSON.stringify(players_rolls);
        socket.broadcast.emit('everyone_rolls_ready', {datas: encoded_rolls});
        socket.emit('everyone_rolls_ready', {datas: encoded_rolls});
        players_rolls = {};
    }
}

function playerReadyForMatch(socket)
{
    console.log("dans playerIsReady");

    players_status["player_"+socket.userID] = true;
    if(Object.keys(players_status).length == 2)
    {
        socket.broadcast.emit('everyone_ready_for_match');
        socket.emit('everyone_ready_for_match');
    }
}

function launchSolve(socket)
{
    socket.broadcast.emit('launch_solve');
    socket.emit('launch_solve');
}
