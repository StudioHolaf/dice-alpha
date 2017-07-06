var io;
var rooms = [];
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
    socket.on('player_ready_for_match', function(datas){playerReadyForMatch(socket, datas)});
    socket.on('my_roll_ready', function(datas){myRollReady(socket, datas)});
    socket.on('player_ready_for_next_reroll', function(datas){playerReadyForNextReroll(socket, datas)});
    socket.on('player_launch_solve', function(){launchSolve(socket)});
    socket.on("player_leave_match", function(){playerLeaveMatch(socket)});


    //forge
    socket.on('player_connection_forge', function(datas){playerJoinForge(socket, datas, addedUser)});
    socket.on('player_deck_saved', function(datas){playerDeckSaved(socket, datas)});
}

function initRoom()
{
    var room = [];
    var tourTime = setTimeout(function(){},100000);

    room.players_datas = [];
    room.players_rolls = {};
    room.timerPlayers = {};
    room.tourTime = tourTime;
    room.numUser = 0;

    return room;
}

function playerLeaveMatch(socket)
{
    console.log("player-leave-match");
    var roomid = socket.room_id;

    if (socket.userID == null)
        return;
    else
    {
        if (rooms[roomid].players_datas.length > 0)
        {
            for (var i = rooms[roomid].players_datas.length - 1; i >= 0; i--) {
                if (socket.userID == rooms[roomid].players_datas[i]._id) {
                    rooms[roomid].players_datas.splice(i, 1);
                }
            }
            var keyPlayersRolls = "player_" + socket.userID;
            if (!rooms[roomid].players_rolls[keyPlayersRolls])
                delete rooms[roomid].players_rolls[keyPlayersRolls];
            if (!rooms[roomid].timerPlayers[keyPlayersRolls]);
            delete rooms[roomid].timerPlayers[keyPlayersRolls];
            rooms[roomid].numUser--;
            if (rooms[roomid].numUser <= 0)
            {
                delete rooms[roomid];
            }
        }
    }
    socket.to(socket.room_id).emit('user_left');
}

function playerJoinGame(socket, datas, addedUser)
{
    if (addedUser) return;
    socket.userID = datas.user_id;
    socket.join(datas.room_id);

    if (!rooms[datas.room_id])
        rooms[datas.room_id] = initRoom();

    rooms[datas.room_id].numUser++;

    console.log("numUsers : "+rooms[datas.room_id].numUser);
    console.log("room_id : %o",datas.room_id);
    socket.userNumber = rooms[datas.room_id].numUser;
    socket.room_id = datas.room_id;

    if (rooms[datas.room_id].numUser > 2)
    {
        spectatorJoinGame(socket);
    }

    if (rooms[datas.room_id].numUser <= 2) {
        db.collection("player").findOne({_id: parseInt(datas.user_id)}, function (err, player) {
            if (err) throw err;
                utils_player.construct_player(player, function (player) {
                    rooms[socket.room_id].players_datas.push(player);
                    socket.emit('player_init', {datas: player});
                    if (rooms[datas.room_id].numUser == 2) {
                        socket.to(socket.room_id).emit('match_init', {datas: rooms[socket.room_id].players_datas[1]}); //TODO LA QUE CA DOIT BEUGER
                        socket.emit('match_init', {datas: rooms[socket.room_id].players_datas[0]});
                        console.log("sending player to 2 users");
                    }
            });
        });
    }
}

function startTimer(socket)
{
    var isStillTime = false;

    for (key in rooms[socket.room_id].timerPlayers) {
        if(rooms[socket.room_id].timerPlayers[key] >= 1) {
            rooms[socket.room_id].timerPlayers[key] -= 1;
            if(rooms[socket.room_id].timerPlayers[key] >= 1) {
                isStillTime = true;
            }
        }
    }
    clearTimeout(rooms[socket.room_id].tourTime);
    if (isStillTime)
    {
        rooms[socket.room_id].tourTime = setTimeout(function(){startTimer(socket);}, 1000);
    }
    else
    {
        clearTimeout(rooms[socket.room_id].tourTime);
    }
    var encodeTimers = JSON.stringify(rooms[socket.room_id].timerPlayers);
    socket.to(socket.room_id).emit('update_timer', {timers:encodeTimers});
    socket.emit('update_timer', {timers:encodeTimers});
}

function spectatorJoinGame(socket)
{
    //socket.to(socket.room_id).emit('spectator_init', {datas: players_datas[socket.room_id]});
    console.log("players_datas : %o",rooms[socket.room_id].players_datas);
    socket.emit('spectator_init', {player1: rooms[socket.room_id].players_datas[0], player2: rooms[socket.room_id].players_datas[1]});
    console.log("Spectator enter");
}

function playerDisconnect(socket)
{
    console.log("player-disconnect");
    var roomid = socket.room_id;
    if (!socket.userID)
        return;
    else
        {
            if (rooms[roomid].players_datas.length > 0)
            {
                for (var i = rooms[roomid].players_datas.length - 1; i >= 0; i--) {
                    if (socket.userID == rooms[roomid].players_datas[i]._id) {
                        rooms[roomid].players_datas.splice(i, 1);
                    }
                }
                var keyPlayersRolls = "player_" + socket.userID;
                if (!rooms[roomid].players_rolls[keyPlayersRolls])
                    delete rooms[roomid].players_rolls[keyPlayersRolls];
                if (!rooms[roomid].timerPlayers[keyPlayersRolls]);
                    delete rooms[roomid].timerPlayers[keyPlayersRolls];
                rooms[roomid].numUser--;
                if (rooms[roomid].numUser <= 0)
                {
                    delete rooms[roomid];
                }
            }
        }
    socket.to(socket.room_id).emit('user_left');
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

    rooms[socket.room_id].players_rolls["player_"+socket.userID] = datas.roll;
    socket.to(socket.room_id).emit('opponent_roll_ready');

    if (Object.keys(rooms[socket.room_id].players_rolls).length == 2)
    {
        var encoded_rolls = JSON.stringify(rooms[socket.room_id].players_rolls);
        socket.to(socket.room_id).emit('everyone_rolls_ready', {datas: encoded_rolls});
        socket.emit('everyone_rolls_ready', {datas: encoded_rolls});
        rooms[socket.room_id].players_rolls = {};
        rooms[socket.room_id].timerPlayers = {};
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
    if(!rooms[socket.room_id].players_rolls)
        rooms[socket.room_id].players_rolls = {};

    rooms[socket.room_id].players_rolls["player_"+socket.userID] = [rnd1,rnd2,rnd3,rnd4,rnd5];
    if(Object.keys(rooms[socket.room_id].players_rolls).length == 2)
    {
        var encoded_rolls = JSON.stringify(rooms[socket.room_id].players_rolls);
        socket.to(socket.room_id).emit('everyone_ready_for_match',{datas: encoded_rolls});
        socket.emit('everyone_ready_for_match',{datas: encoded_rolls});
        rooms[socket.room_id].players_rolls = {};
        rooms[socket.room_id].timerPlayers= {};
    }
}

function playerReadyForNextReroll(socket, datas)
{
    console.log("playerReadyForNextReroll");

    if(!rooms[socket.room_id].timerPlayers)
        rooms[socket.room_id].timerPlayers = {};

    rooms[socket.room_id].timerPlayers["player_"+socket.userID] = parseInt(datas.playerTime) + 1; //pour partir de 15 et pas 14
    if(Object.keys(rooms[socket.room_id].timerPlayers).length == 2)
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
