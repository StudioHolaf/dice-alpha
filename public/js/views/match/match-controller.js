
var tab_tirage_random = [];
var rollSend = false;
var flag_end_turn = false;
var nbTotalTurn = 1;
var player1View;
var player1Dice1;
var player1Dice2;
var player1Dice3;
var player1Dice4;
var player1Dice5;
var player2View;
var player2Dice1;
var player2Dice2;
var player2Dice3;
var player2Dice4;
var player2Dice5;
var rolls = []; //Tirage des 2 joueurs.

// Stage
var level = new Stage(4000, "bg1", 1000, 800);

rivets.binders['pv-bar'] = function (el, value) {
    var pv = el.getAttribute("pv");
    var pvMax = el.getAttribute("pv-max");
    var percent = (pv / pvMax) * 100;
    el.style.width = percent + "%";
};

rivets.binders['ultime-bar'] = function (el, value) {
    var ultime = el.getAttribute("ultime");
    var ultimeMax = el.getAttribute("ultime-max");
    var percent = (ultime / ultimeMax) * 100;
    el.style.width = percent + "%";
};

rivets.binders['player-avatar'] = function (el, value) {
    el.style.backgroundImage = "url('" + value + "')";
};

rivets.binders['face-spell'] = function (el, value) {
    el.style.backgroundImage = "url('" + value + "')";
};

rivets.binders['player-reroll'] = function (el, value) {
    var nbReroll = match1.players[0].reroll;
    el.style.width =  "reroll :" + nbReroll;
}

var locationGetted = window.location.pathname;
var locationSplitted = locationGetted.split("/");
var roomid = locationSplitted[locationSplitted.length - 1];
var player_1_id;
var timeDuration = 0;

//console.log("roomid ", roomid);

var socket = io.connect();

socket.emit('connection', roomid);

socket.on('ask_for_login', function () {
    //console.log("ask_for_login in room " + roomid);
    swal({
            title: "Welcome to dice!",
            text: "Enter user id",
            type: "input",
            showCancelButton: true,
            closeOnConfirm: true,
            animation: "slide-from-top",
            inputPlaceholder: "User id"
        },
        function (inputValue) {
            if (inputValue === false) return false;

            if (inputValue === "") {
                swal.showInputError("You need to write something!");
                return false
            }
            //console.log("user id : ", inputValue);
            player_1_id = parseInt(inputValue);
            //var room_id;
            console.log("Room id : %o",room_id);
            socket.emit('player_connection', {user_id:inputValue, room_id : room_id});
        });
})

var match1 = [];
var player_1;
socket.on('player_init', function (player_1_datas) {
    //console.log("player_init :", player_1_datas);
    player_1 = Object.assign(new Player, player_1_datas.datas);
    player_1._deck = constructDeckFromJSON(player_1);
    var player1View = rivets.bind($('#player-1-section'), player_1);
    var player1Dice1 = rivets.bind($('#player-1-roller .dice-viewer[dice-id="0"]'), player_1.getDiceOnDeck(0,0));
    var player1Dice2 = rivets.bind($('#player-1-roller .dice-viewer[dice-id="1"]'), player_1.getDiceOnDeck(0,1));
    var player1Dice3 = rivets.bind($('#player-1-roller .dice-viewer[dice-id="2"]'), player_1.getDiceOnDeck(0,2));
    var player1Dice4 = rivets.bind($('#player-1-roller .dice-viewer[dice-id="3"]'), player_1.getDiceOnDeck(0,3));
    var player1Dice5 = rivets.bind($('#player-1-roller .dice-viewer[dice-id="4"]'), player_1.getDiceOnDeck(0,4));
});


socket.on('match_init', function (players_datas) {
    //console.log("match init datas : ", players_datas);
    var player_2 = Object.assign(new Player, players_datas.datas);
    player_2._deck = constructDeckFromJSON(player_2);

    match1 = new Match(5000, player_1, player_2, level);
    match1.clearValues();
    match1.reincrementValues();
    player2View = rivets.bind($('#player-2-section'), match1.players[1]);
    player2Dice1 = rivets.bind($('#player-2-roller .dice-viewer[dice-id="0"]'), player_2.getDiceOnDeck(0,0));
    player2Dice2 = rivets.bind($('#player-2-roller .dice-viewer[dice-id="1"]'), player_2.getDiceOnDeck(0,1));
    player2Dice3 = rivets.bind($('#player-2-roller .dice-viewer[dice-id="2"]'), player_2.getDiceOnDeck(0,2));
    player2Dice4 = rivets.bind($('#player-2-roller .dice-viewer[dice-id="3"]'), player_2.getDiceOnDeck(0,3));
    player2Dice5 = rivets.bind($('#player-2-roller .dice-viewer[dice-id="4"]'), player_2.getDiceOnDeck(0,4));
    setTimeout(function(){
        new swal ({
                title: "Êtes-vous prêt ?",
                type: "success",
                showCancelButton: true,
                confirmButtonColor: "#3F8F4E",
                confirmButtonText: "Un peu mon neveu !",
                closeOnConfirm: true
            },
            function () {
                socket.emit('player_ready_for_match', {playerTime : match1.players[0].tourTime});
                timeDuration = match1.players[0].tourTime;
            });
    },1000);

});

socket.on('everyone_ready_for_match', function (players_datas) {
    //console.log("players rolls %o", players_datas);
    rolls = JSON.parse(players_datas.datas);
    autoRoll(rolls);
});

socket.on('everyone_ready_for_next_reroll', function () {
    rollSend = false;
    if (isPlayerHasReroll(0) == false)
         prepareRollForSelectedDices();
    $("#roller-button").removeClass("btn-lock");
    $("#ready-button").removeClass("btn-lock");
});

socket.on('spectator_init', function (players_datas) {
    //console.log("spectator init datas : ", players_datas);
    var player_1 = Object.assign(new Player, players_datas.player1);
    player_1._deck = constructDeckFromJSON(player_1);
    var player_2 = Object.assign(new Player, players_datas.player2);
    player_2._deck = constructDeckFromJSON(player_2);

    match1 = new Match(5000, player_1, player_2, level);
    match1.clearValues();
    match1.reincrementValues();
    player1View = rivets.bind($('#player-1-section'), match1.players[0]);
    player2View = rivets.bind($('#player-2-section'), match1.players[1]);

    var player1View = rivets.bind($('#player-1-section'), player_1);
    var player1Dice1 = rivets.bind($('#player-1-roller .dice-viewer[dice-id="0"]'), player_1.getDiceOnDeck(0,0));
    var player1Dice2 = rivets.bind($('#player-1-roller .dice-viewer[dice-id="1"]'), player_1.getDiceOnDeck(0,1));
    var player1Dice3 = rivets.bind($('#player-1-roller .dice-viewer[dice-id="2"]'), player_1.getDiceOnDeck(0,2));
    var player1Dice4 = rivets.bind($('#player-1-roller .dice-viewer[dice-id="3"]'), player_1.getDiceOnDeck(0,3));
    var player1Dice5 = rivets.bind($('#player-1-roller .dice-viewer[dice-id="4"]'), player_1.getDiceOnDeck(0,4));
    
    player2View = rivets.bind($('#player-2-section'), match1.players[1]);
    player2Dice1 = rivets.bind($('#player-2-roller .dice-viewer[dice-id="0"]'), player_2.getDiceOnDeck(0,0));
    player2Dice2 = rivets.bind($('#player-2-roller .dice-viewer[dice-id="1"]'), player_2.getDiceOnDeck(0,1));
    player2Dice3 = rivets.bind($('#player-2-roller .dice-viewer[dice-id="2"]'), player_2.getDiceOnDeck(0,2));
    player2Dice4 = rivets.bind($('#player-2-roller .dice-viewer[dice-id="3"]'), player_2.getDiceOnDeck(0,3));
    player2Dice5 = rivets.bind($('#player-2-roller .dice-viewer[dice-id="4"]'), player_2.getDiceOnDeck(0,4));
});

socket.on('disconnect', function () {
    //console.log('you have been disconnected : ' + player_1.id);
});

function isStillReroll() {
    var isStillReroll = false;
    match1.players.forEach(function (player) {
        for (var diceIndex = 0; diceIndex < 5; diceIndex++) {
            var dice = player.getDiceOnDeck(0, diceIndex);
            if (dice.reroll > 0) {
                if (isStillReroll == false)
                    isStillReroll = true;
                break;
            }
        }
    });
    return isStillReroll;
}

function isPlayerHasReroll(player_id) {
    var isStillReroll = false;
    var player = match1.players[player_id];
    for (var diceIndex = 0; diceIndex < 5; diceIndex++) {
        var dice = player.getDiceOnDeck(0, diceIndex);
        if (dice.reroll > 0) {
            if (isStillReroll == false)
                isStillReroll = true;
            break;
        }
    }
    return isStillReroll;
}

socket.on('update_timer', function(datas) {
    var timerParsed = JSON.parse(datas.timers);
    //console.log("update timer to ",timerParsed);
    if (timerParsed["player_"+match1.players[0].id] <= 0 || timerParsed["player_"+match1.players[0].id] == null)
        document.getElementById('time-count').innerHTML = '0';
    else
        document.getElementById('time-count').innerHTML = timerParsed["player_"+match1.players[0].id];
    document.getElementById('time-total').innerHTML = timeDuration;
    if(timerParsed["player_"+match1.players[0].id] == 0)
    {
        if(!rollSend)
            prepareRollForSelectedDices();
    }
})

function initInterface() {
    setTimeout(function () {
        $(".dices-viewer-container .dice-viewer:nth-child(1)").animateCss("pulse");
        setTimeout(function () {
            $(".dices-viewer-container .dice-viewer:nth-child(2)").animateCss("pulse");
            setTimeout(function () {
                $(".dices-viewer-container .dice-viewer:nth-child(3)").animateCss("pulse");
                setTimeout(function () {
                    $(".dices-viewer-container .dice-viewer:nth-child(4)").animateCss("pulse");
                    setTimeout(function () {
                        $(".dices-viewer-container .dice-viewer:nth-child(5)").animateCss("pulse");
                    }, 250);
                }, 250);
            }, 250);
        }, 250);
    }, 250);
}

function callbackRefreshInterface() {
    //console.log("TEMPS DU JOUEUR : "+match1.players[0].tourTime);
    $(".dice-viewer").removeClass("disabled");
    $("#end-turn-button").removeClass("btn-lock");
    var player_id = 1;
    match1.players.forEach(function (player) {
        var dice_id = 0;
        player.deck[0].forEach(function (dice) {
            if (!dice.isActive()) {
                $('#player-' + player_id + '-roller .dice-viewer[dice-id="' + dice_id + '"]').addClass("disabled");
                //console.log("rajout de la class Disabled");
            }
            dice_id++;
        })
        player_id++;
    });
    setTimeout(function()
    {
        if (flag_end_turn == false) {
            socket.emit('player_ready_for_next_reroll', {playerTime: match1.players[0].tourTime});
            prepareRollAllDices();
            $("#roller-button").removeClass("btn-lock");
            $("#ready-button").removeClass("btn-lock");
            $("#end-turn-button").addClass("btn-lock");
        }
    },10000);
}

$("#end-turn-button").click(function () {
    if(!$(this).hasClass("btn-lock"))
    {
        //console.log("btn lock not");
        flag_end_turn = true;
        swalDisplayTotalTurn();
        $("#end-turn-button").addClass("btn-lock");
    }
});

function swalDisplayTotalTurn ()
{
    $(".dice-viewer").addClass("spell-hidden");
    nbTotalTurn += 1;
    new swal ({
        title: "Êtes-vous prêt pour le tour "+nbTotalTurn+" ?",
        type: "success",
        confirmButtonColor: "#3F8F4E",
        confirmButtonText: "Oui je le suis",
        closeOnConfirm: true
    }, function () {
        socket.emit('player_ready_for_next_reroll', {playerTime: match1.players[0].tourTime});
        prepareRollAllDices();
    });
}

initInterface();

function setDiceFace(player_number, dice_id, face_img, animationTime) {
    setTimeout(function () {
        $('#player-' + player_number + '-roller .dice-viewer[dice-id="' + dice_id + '"] .face-spell').css("background-image", "url('" + face_img + "')");
    }, animationTime)

    $('#player-' + player_number + '-roller .dice-viewer[dice-id="' + dice_id + '"]').animateCss("flip");
}

$("#roller-button").click(function () {
    if(!$(this).hasClass("btn-lock"))
        prepareRollForSelectedDices();
});

$("#solve-button").click(function () {
    socket.emit('player_ready_for_solve');
});

$("#ready-button").click(function () {
    if(!$(this).hasClass("btn-lock"))
    {
        new swal ({
                title: "Êtes-vous sur de confirmer vos dès ?",
                type: "success",
                showCancelButton: true,
                confirmButtonColor: "#3F8F4E",
                confirmButtonText: "Ouep !",
                closeOnConfirm: true
            },
            function () {
                $("#player-1-roller .dice-viewer").each(function () {

                    var dice_id = $(this).attr("dice-id");
                    var player_id = $(this).parent().parent().attr("player-id");
                    var player = match1.players[player_id - 1];
                    var dice = player.getDiceOnDeck(0, dice_id);

                    dice.reroll = 0;
                    if (!rollSend)
                        prepareRollForSelectedDices();
                });
            })
    , 1000;
    }
});


$("#player-1-roller .dice-viewer").click(function () {
    var dice_id = $(this).attr("dice-id");
    var player_id = $(this).parent().parent().attr("player-id");
    var dice = match1.players[player_id - 1].getDiceOnDeck(0, dice_id);

    if (dice.reroll > 0 && dice.isActive())
        $(this).toggleClass("selected");
});

$(".dice-viewer").mouseenter(function () {
    var dice_id = parseInt($(this).attr("dice-id"));
    var player_id = parseInt($(this).parent().parent().attr("player-id"));
    var dice = match1.players[player_id - 1].getDiceOnDeck(0, dice_id);
    var roll_val = parseInt($(this).attr("roll-val"));
    var face = dice.getFaceByPosition(roll_val);


    $('#name-hover').html(face.name);
    $('#description-hover').html(face.description);
    $('#spellOnMe-hover').html(face.getFaceDegatsHtml());
    $('#spellOnOpponent-hover').html(face.getFaceManasHtml());


    /* -------------- REROLL INFO -------------- */

    //console.log("reroll : ", dice.reroll);
    $('#player-reroll').html(dice.reroll);


});

function prepareRollForSelectedDices() {
    rollSend = true;
    var rnd_j1 = [-1, -1, -1, -1, -1];
    $("#player-1-roller .dice-viewer.selected").each(function () {
        var dice_id = $(this).attr("dice-id");
        var dice = match1.players[0].getDiceOnDeck(0, dice_id);
        var rnd = Math.floor(Math.random() * 6) + 0;

        if (dice.reroll > 0 && dice.isActive()) {
            rnd_j1[dice_id] = rnd;
        }
    });
    socket.emit('my_roll_ready', {roll: rnd_j1});
    /*new Noty({
        type: 'success',
        layout: 'topRight',
        text: ("Your reroll is ready"),
        timeout: 2500,
        progressBar: true,
    }).show();*/
}

function prepareRollAllDices() {
    rollSend = true;
    var rnd_j1 = [-1, -1, -1, -1, -1];
    $("#player-1-roller .dice-viewer").each(function () {
        var dice_id = $(this).attr("dice-id");
        var dice = match1.players[0].getDiceOnDeck(0, dice_id);
        var rnd = Math.floor(Math.random() * 6) + 0;

        if (dice.reroll > 0 && dice.isActive()) {
            rnd_j1[dice_id] = rnd;
        }
    });
    socket.emit('my_roll_ready', {roll: rnd_j1});
    /*new Noty({
        type: 'success',
        layout: 'topRight',
        text: ("Your reroll is ready"),
        timeout: 2500,
        progressBar: true,
    }).show();*/
}


socket.on('launch_solve', function () {
    solve();
});

socket.on('opponent_roll_ready', function (players_datas) {
    /*new Noty({
        type: 'information',
        layout: 'topRight',
        text: ("Opponent roll is ready"),
        timeout: 2500,
        progressBar: true,
    }).show();*/
    socket.emit('opponent_roll_ready', players_datas);
});

socket.on('everyone_rolls_ready', function (players_datas) {
    //console.log("players rolls %o", players_datas);
    rolls = JSON.parse(players_datas.datas);
    autoRoll(rolls);
});

socket.on('iam_ready', function (players_datas) {
    //console.log("players rolls %o", players_datas);
});

socket.on("user_left",function()
{
    match1.emptyUserByPosition(1);
    player2View.unbind();
    //console.log("user "+player_1.id+" left reload page");
    //location.reload();
})

function solve() {
    rollSend = false;
    $(".dice-viewer").removeClass("selected");
    if (tab_tirage_random.length > 0) {
        match1.solve(tab_tirage_random, callbackRefreshInterface);
        tab_tirage_random = [];
    }
}

function autoRoll(rolls) {
    if (tab_tirage_random.length <= 0) {
        var rnd_res_j1 = [0, 0, 0, 0, 0];
        var rnd_res_bot1 = [0, 0, 0, 0, 0];
        tab_tirage_random = [rnd_res_j1, rnd_res_bot1];
    }
    $(".dice-viewer").each(function () {

        var dice_id = $(this).attr("dice-id");
        var player_id = $(this).parent().parent().attr("player-id");
        var player = match1.players[player_id - 1];
        var dice = player.getDiceOnDeck(0, dice_id);

        if (dice.reroll > 0 && dice.isActive()) {
            //player -= 1;
            if (rolls["player_" + player.id][dice_id] >= 0) {
                if ((player_id - 1) == 0) {
                    tab_tirage_random[(player_id - 1)][dice_id] = rolls["player_" + player.id][dice_id];
                    var previous_roll_val = parseInt($('#player-' + player_id + '-roller .dice-viewer[dice-id="' + dice_id + '"]').attr("roll-val"));
                    if(previous_roll_val == rolls["player_" + player.id][dice_id])
                    {
                        $('#player-' + player_id + '-roller .dice-viewer[dice-id="' + dice_id + '"]').animateCss("wobble-mini");
                        console.log("Same face : "+previous_roll_val);
                    }
                    $('#player-' + player_id + '-roller .dice-viewer[dice-id="' + dice_id + '"]').attr("roll-val",rolls["player_" + player.id][dice_id]);
                    //$('#player-' + player_id + '-roller .dice-viewer[dice-id="' + dice_id + '"] .face-name').html(dice.getFaceByPosition(rolls["player_" + player.id][dice_id]).name);

                }
                if ((player_id - 1) == 1) {
                    tab_tirage_random[(player_id - 1)][dice_id] = rolls["player_" + player.id][dice_id];
                    var previous_roll_val = parseInt($('#player-' + player_id + '-roller .dice-viewer[dice-id="' + dice_id + '"]').attr("roll-val"));
                    if(previous_roll_val == rolls["player_" + player.id][dice_id])
                    {
                        $('#player-' + player_id + '-roller .dice-viewer[dice-id="' + dice_id + '"]').animateCss("wobble-mini");
                        console.log("Same face : "+previous_roll_val);
                    }
                    $('#player-' + player_id + '-roller .dice-viewer[dice-id="' + dice_id + '"]').attr("roll-val",rolls["player_" + player.id][dice_id]);
                    //$('#player-' + player_id + '-roller .dice-viewer[dice-id="' + dice_id + '"] .face-name').html(dice.getFaceByPosition(rolls["player_" + player.id][dice_id]).name);

                }
            }
        }


    });
    match1.players[0].decreaseAllDiceReroll();
    match1.players[1].decreaseAllDiceReroll();

    if (isStillReroll())
    {
        socket.emit('player_ready_for_next_reroll', {playerTime : match1.players[0].tourTime});
    }
    else
    {
        $("#roller-button").addClass("btn-lock");
        $("#ready-button").addClass("btn-lock");
        setTimeout(function()
        {
            solve();
        },2000);
    }
    $(".dice-viewer").removeClass("selected");
    $(".dice-viewer").removeClass("spell-hidden");
}

bg_music = new Audio('/assets/music/dice_theme_1.mp3');
bg_music.addEventListener('ended', function () {
    this.currentTime = 0;
    this.play();
}, false);

$("#sound-controller").click(function () {
    if (!$(this).hasClass("shutted")) {
        bg_music.pause();
        $(this).addClass("shutted")
    }
    else {
        bg_music.play();
        $(this).removeClass("shutted");
    }
})