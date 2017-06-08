var io;
var numUsers = 0;
var players_datas = [];
var players_rolls = {};
var timerPlayers = {};
var tourTime;

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
    if(numUsers >= 2)
    {
        spectatorJoinGame(socket);
    }
    else
        socket.emit('ask_for_login');

    // Host Events
    socket.on("disconnect", function(datas){playerDisconnect(socket, datas, addedUser)});

    // Player Events
    socket.on('player_connection', function(datas){playerJoinGame(socket, datas, addedUser)});
    socket.on('player_disconnect', function(datas){playerLeftGame(socket)});
    socket.on('player_ready_for_match', function(datas){playerReadyForMatch(socket, datas)});
    socket.on('my_roll_ready', function(datas){myRollReady(socket, datas)});
    socket.on('player_ready_for_next_reroll', function(datas){playerReadyForNextReroll(socket, datas)});
    socket.on('player_launch_solve', function(){launchSolve(socket)});

    //forge
    socket.on('player_connection_forge', function(datas){playerJoinForge(socket, datas, addedUser)});
    socket.on('player_deck_saved', function(datas){playerDeckSaved(socket, datas)});
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
}

function startTimer(socket)
{
    var isStillTime = false;
    for (key in timerPlayers) {
        if(timerPlayers[key] >= 1) {
            timerPlayers[key] -= 1;
            if(timerPlayers[key] >= 1) {
                isStillTime = true;
            }
        }
    }
    clearTimeout(tourTime);
    if (isStillTime)
    {
        tourTime = setTimeout(function(){startTimer(socket);}, 1000);
    }
    else
    {
        clearTimeout(tourTime);
    }
    var encodeTimers = JSON.stringify(timerPlayers);
    socket.broadcast.emit('update_timer', {timers:encodeTimers});
    socket.emit('update_timer', {timers:encodeTimers});
}

function spectatorJoinGame(socket)
{
    socket.broadcast.emit('spectator_init', {datas: players_datas});
    socket.emit('spectator_init', {datas: players_datas});
}

function playerDisconnect(socket)
{
    console.log("player-disconnect");
    numUsers = 0;
    players_datas = [];
    // echo globally that this client has left
    socket.broadcast.emit('user_left');
    socket.emit('user_left');
}

function playerLeftGame(socket, datas, addedUser)
{
    if (addedUser) {
        --numUsers;
        players_datas = [];
        // echo globally that this client has left
        socket.broadcast.emit('user_left', {
            username: socket.username
        });
    }
}

function myRollReady(socket, datas)
{
    //timerPlayers["player_"+socket.userID] = parseInt(datas.playerTime);
    players_rolls["player_"+socket.userID] = datas.roll;
    socket.broadcast.emit('opponent_roll_ready');

    if (Object.keys(players_rolls).length == 2)
    {
        var encoded_rolls = JSON.stringify(players_rolls);
        socket.broadcast.emit('everyone_rolls_ready', {datas: encoded_rolls});
        socket.emit('everyone_rolls_ready', {datas: encoded_rolls});
        players_rolls = {};
        timerPlayers = {};
    }
}

function playerReadyForMatch(socket, datas)
{
    console.log("playerReadyForMatch");

    var rnd1 = Math.floor(Math.random() * 6) + 0;
    var rnd2 = Math.floor(Math.random() * 6) + 0;
    var rnd3 = Math.floor(Math.random() * 6) + 0;
    var rnd4 = Math.floor(Math.random() * 6) + 0;
    var rnd5 = Math.floor(Math.random() * 6) + 0;
    //timerPlayers["player_"+socket.userID] = parseInt(datas.playerTime) + 1;
    players_rolls["player_"+socket.userID] = [rnd1,rnd2,rnd3,rnd4,rnd5];
    if(Object.keys(players_rolls).length == 2)
    {
        var encoded_rolls = JSON.stringify(players_rolls);
        socket.broadcast.emit('everyone_ready_for_match',{datas: encoded_rolls});
        socket.emit('everyone_ready_for_match',{datas: encoded_rolls});
        players_rolls = {};
        timerPlayers = {};
    }
}

function playerReadyForNextReroll(socket, datas)
{
    console.log("playerReadyForNextReroll");

    timerPlayers["player_"+socket.userID] = parseInt(datas.playerTime) + 1; //pour partir de 15 et pas 14
    if(Object.keys(timerPlayers).length == 2)
    {
        socket.broadcast.emit('everyone_ready_for_next_reroll');
        socket.emit('everyone_ready_for_next_reroll');
        setTimeout(function(){
            startTimer(socket);
        },1000);
    }
}

function launchSolve(socket)
{
    socket.broadcast.emit('launch_solve');
    socket.emit('launch_solve');
}


////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////        ***** FORGE STUFF *****         ////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

function playerJoinForge(socket, id, addedUser)
{
    if (addedUser) return;
    ++numUsers;
    console.log("numUsers : "+numUsers);
    socket.userID = id;
    socket.userNumber = numUsers;
    var tabOwnedFaces = [];
    if (numUsers == 1) {
        db.collection("player").findOne({_id: parseInt(id)}, function (err, player) {
            if (err) throw err;
            utils_player.construct_player(player, function (playerConstruct) {
                tabOwnedFaces = player._ownedFaces;
                var playerStringify = JSON.stringify(playerConstruct);
                //console.log("mon player stringify : "+playerStringify);
                utils_player.construct_owned_faces(tabOwnedFaces, function (OwnedFaces) {
                    var tabStringify = JSON.stringify(OwnedFaces);
                    //console.log("tab owned faces 1 : ", tabStringify);
                    socket.emit('player_forge_init', {player: playerStringify, ownedFaces: tabStringify});
                });
            });
        });
    }
}

function playerDeckSaved(socket, datas)
{
    var deckDecode = JSON.parse(datas.deck);
    var playerID = datas.player_id;
    console.log("côté serveur : %o",deckDecode);
    console.log("côté serveur id player : ",playerID);
    //COMMENT RETROUVER LE BON JOUEUR ?!
    //         db.collection("player").findOne({_id: parseInt(id)}, function (err, player) {
    
    db.collection("player").update(
        { _id: parseInt(playerID) },
        { $set:
            {
                _deck : deckDecode
            }
        }
    )
}
