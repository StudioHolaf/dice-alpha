var io;
var numUsers = {};
var players_datas = [];
var players_rolls = {};
var timerPlayers = {};
var tourTime = {};
var utils_player = require( './utils_player' );
var utils_data = require( './utils_data' );
var utils_server = require( './utils_server' );

/**
 * This function is called by index.js to initialize a new game instance.
 *
 * @param sio The Socket.IO library
 * @param socket The socket object for the connected client.
 */
exports.initGameSockets = function (sio, socket, addedUser) {
    io = sio;
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

function playerJoinGame(socket, datas, addedUser)
{
    if (addedUser) return;
    socket.userID = datas.user_id;
    socket.join(datas.room_id);
    if(numUsers[datas.room_id])
        numUsers[datas.room_id]++;
    else
        numUsers[datas.room_id] = 1;

    if(!players_datas[datas.room_id])
        players_datas[datas.room_id] = [];

    if(!tourTime[datas.room_id])
        tourTime[datas.room_id] = setTimeout(function(){},100000);

    console.log("numUsers : "+numUsers[datas.room_id]);
    console.log("room_id : %o",datas.room_id);
    socket.userNumber = numUsers;
    socket.room_id = datas.room_id;

    if(numUsers[datas.room_id] > 2)
    {
        spectatorJoinGame(socket);
    }

    if (numUsers[datas.room_id] <= 2) {
        db.collection("player").findOne({_id: parseInt(datas.user_id)}, function (err, player) {
            if (err) throw err;
                utils_player.construct_player(player, function (player) {
                    players_datas[socket.room_id].push(player);
                    socket.emit('player_init', {datas: player});
                    if (numUsers[datas.room_id] == 2) {
                        socket.to(socket.room_id).emit('match_init', {datas: players_datas[socket.room_id][1]});
                        socket.emit('match_init', {datas: players_datas[socket.room_id][0]});
                        console.log("sending player to 2 users");
                    }
            });
        });
    }
}

function startTimer(socket)
{
    var isStillTime = false;

    if(!timerPlayers[socket.room_id])
        timerPlayers[socket.room_id] = {};

    for (key in timerPlayers[socket.room_id]) {
        if(timerPlayers[socket.room_id][key] >= 1) {
            timerPlayers[socket.room_id][key] -= 1;
            if(timerPlayers[socket.room_id][key] >= 1) {
                isStillTime = true;
            }
        }
    }
    clearTimeout(tourTime[socket.room_id]);
    if (isStillTime)
    {
        tourTime[socket.room_id] = setTimeout(function(){startTimer(socket);}, 1000);
    }
    else
    {
        clearTimeout(tourTime[socket.room_id]);
    }
    var encodeTimers = JSON.stringify(timerPlayers[socket.room_id]);
    socket.to(socket.room_id).emit('update_timer', {timers:encodeTimers});
    socket.emit('update_timer', {timers:encodeTimers});
}

function spectatorJoinGame(socket)
{
    //socket.to(socket.room_id).emit('spectator_init', {datas: players_datas[socket.room_id]});
    console.log("players_datas : %o",players_datas[socket.room_id]);
    socket.emit('spectator_init', {player1: players_datas[socket.room_id][0], player2: players_datas[socket.room_id][1]});
    console.log("Spectator enter");
}

function playerDisconnect(socket)
{
    console.log("player-disconnect");
    numUsers[socket.room_id]--;
    // echo globally that this client has left
    socket.to(socket.room_id).emit('user_left');
    //utils_server.deleteUserServer(socket.userID, players_datas[socket.room_id]);
}

/*function playerLeftGame(socket, datas, addedUser)
{
    if (addedUser) {
        --numUsers;
        players_datas = [];
        // echo globally that this client has left
        socket.to(socket.room_id).emit('user_left', {
            username: socket.username
        });
    }
}*/

function myRollReady(socket, datas)
{
    //timerPlayers["player_"+socket.userID] = parseInt(datas.playerTime);
    if(!players_rolls[socket.room_id])
        players_rolls[socket.room_id] = {};

    players_rolls[socket.room_id]["player_"+socket.userID] = datas.roll;
    socket.to(socket.room_id).emit('opponent_roll_ready');

    if (Object.keys(players_rolls[socket.room_id]).length == 2)
    {
        var encoded_rolls = JSON.stringify(players_rolls[socket.room_id]);
        socket.to(socket.room_id).emit('everyone_rolls_ready', {datas: encoded_rolls});
        socket.emit('everyone_rolls_ready', {datas: encoded_rolls});
        players_rolls[socket.room_id] = {};
        timerPlayers[socket.room_id] = {};
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
    if(!players_rolls[socket.room_id])
        players_rolls[socket.room_id] = {};

    players_rolls[socket.room_id]["player_"+socket.userID] = [rnd1,rnd2,rnd3,rnd4,rnd5];
    if(Object.keys(players_rolls[socket.room_id]).length == 2)
    {
        var encoded_rolls = JSON.stringify(players_rolls[socket.room_id]);
        socket.to(socket.room_id).emit('everyone_ready_for_match',{datas: encoded_rolls});
        socket.emit('everyone_ready_for_match',{datas: encoded_rolls});
        players_rolls[socket.room_id] = {};
        timerPlayers[socket.room_id]= {};
    }
}

function playerReadyForNextReroll(socket, datas)
{
    console.log("playerReadyForNextReroll");

    if(!timerPlayers[socket.room_id])
        timerPlayers[socket.room_id] = {};

    timerPlayers[socket.room_id]["player_"+socket.userID] = parseInt(datas.playerTime) + 1; //pour partir de 15 et pas 14
    if(Object.keys(timerPlayers[socket.room_id]).length == 2)
    {
        socket.to(socket.room_id).emit('everyone_ready_for_next_reroll');
        socket.emit('everyone_ready_for_next_reroll');
        setTimeout(function(){
            startTimer(socket);
        },1000);
    }
}

function launchSolve(socket)
{
    socket.to(socket.room_id).emit('launch_solve');
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
    socket.userID = id;
    var tabOwnedFaces = [];
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
