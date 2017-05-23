var io;
var gameSocket;
var numUsers = 0;
var players_datas = [];

var utils_player = require( './utils_player' );

/**
 * This function is called by index.js to initialize a new game instance.
 *
 * @param sio The Socket.IO library
 * @param socket The socket object for the connected client.
 */
exports.initGameSockets = function (sio, socket) {
    io = sio;
    gameSocket = socket;

    var roomid = '1234';

    var addedUser = false;
    console.log("user connect");
    gameSocket.join(roomid);
    gameSocket.emit('ask_for_login');
    console.log('askForLogin ' + roomid);

    gameSocket.on("player_connection", function (data) {
        if (addedUser) return;
        gameSocket.username = data;
        ++numUsers;
        addedUser = true;

        console.log("received player id = " + data);
        gameSocket.emit('player_count', io.engine.clientsCount);
        console.log("numUsers = ", numUsers);
        console.log("received player id = " + data);
        db.collection("player").findOne({_id: parseInt(data)}, function (err, player) {
            if (err) throw err;
            console.log("Construct Player " + data + " and send");
            utils_player.construct_player(player, function (player) {
                players_datas.push(player);
                gameSocket.emit('player_init', { datas: player });
                if (numUsers > 1) {
                    console.log("players_datas sended = ", players_datas);
                    gameSocket.broadcast.emit('match_init', {datas: players_datas});
                }
            });
        });
    })
}