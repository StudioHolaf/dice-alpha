var io;
var numUsers = 0;
var players_datas = [];

var utils_player = require( './utils_player' );

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

}

function playerJoinGame(socket, id, addedUser)
{
    if (addedUser) return;
    ++numUsers;
    console.log("numUsers : "+numUsers);
    socket.userid = id;
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
        // echo globally that this client has left
        socket.broadcast.emit('user left', {
            username: socket.userid
        });
    }
}

function playerLeftGame(socket, data, addedUser)
{
    if (addedUser) {
        --numUsers;

        // echo globally that this client has left
        socket.broadcast.emit('user left', {
            username: socket.username,
            numUsers: numUsers
        });
    }
}