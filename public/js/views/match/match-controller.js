// CE GENRE DE MEMO : MANA - COST - DEGAT - SHIELD - MULTI - REFLECT

//FACES
var tab_tirage_random = [];

function constructDeckFromJSON(player) {
    var decks = [];

    player._deck.forEach(function (deck) {
        var current_deck = [];
        deck.forEach(function (dice) {
            var current_dice = Object.assign(new Dice(), dice);
            current_dice._faces = [];
            dice.forEach(function (face) {
                var current_face = Object.assign(new Face(), face);
                current_face._spellOnMe = [];
                current_face._spellOpponent = [];
                face._spellOnMe.forEach(function (spellOnMe) {

                    var current_spellOnMe = new Spell();

                    var current_fireEffects = Object.assign(new ElementEffect(), spellOnMe._fireEffects);
                    var current_waterEffects = Object.assign(new ElementEffect(), spellOnMe._waterEffects);
                    var current_mountainEffects = Object.assign(new ElementEffect(), spellOnMe._mountainEffects);
                    var current_windEffects = Object.assign(new ElementEffect(), spellOnMe._windEffects);
                    var current_arcaneEffects = Object.assign(new ElementEffect(), spellOnMe._arcaneEffects);
                    var current_neutralEffects = Object.assign(new NeutralEffect(), spellOnMe._neutralEffects);

                    current_spellOnMe._fireEffects = current_fireEffects;
                    current_spellOnMe._waterEffects = current_waterEffects;
                    current_spellOnMe._mountainEffects = current_mountainEffects;
                    current_spellOnMe._windEffects = current_windEffects;
                    current_spellOnMe._arcaneEffects = current_arcaneEffects;
                    current_spellOnMe._neutralEffects = current_neutralEffects;

                    current_face._spellOnMe.push(current_spellOnMe);

                });
                face._spellOpponent.forEach(function (spellOpponent) {
                    var current_spellOpponent = new Spell();

                    var current_fireEffects = Object.assign(new ElementEffect(), spellOpponent._fireEffects);
                    var current_waterEffects = Object.assign(new ElementEffect(), spellOpponent._waterEffects);
                    var current_mountainEffects = Object.assign(new ElementEffect(), spellOpponent._mountainEffects);
                    var current_windEffects = Object.assign(new ElementEffect(), spellOpponent._windEffects);
                    var current_arcaneEffects = Object.assign(new ElementEffect(), spellOpponent._arcaneEffects);
                    var current_neutralEffects = Object.assign(new NeutralEffect(), spellOpponent._neutralEffects);

                    current_spellOpponent._fireEffects = current_fireEffects;
                    current_spellOpponent._waterEffects = current_waterEffects;
                    current_spellOpponent._mountainEffects = current_mountainEffects;
                    current_spellOpponent._windEffects = current_windEffects;
                    current_spellOpponent._arcaneEffects = current_arcaneEffects;
                    current_spellOpponent._neutralEffects = current_neutralEffects;

                    current_face._spellOpponent.push(current_spellOpponent);
                });
                current_dice._faces.push(current_face);
            });
            current_deck.push(current_dice)
        });
        decks.push(current_deck);
    });

    return decks;
}

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

var locationGetted = window.location.pathname;
var locationSplitted = locationGetted.split("/");
var roomid = locationSplitted[locationSplitted.length - 1];
var player_1_id;

console.log("roomid ", roomid);

var socket = io.connect();

socket.emit('connection', roomid);

socket.on('ask_for_login', function () {
    console.log("ask_for_login in room " + roomid);
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
            console.log("user id : ", inputValue);
            player_1_id = parseInt(inputValue);
            socket.emit('player_connection', inputValue);
        });
})

var match1 = [];
var player_1;
socket.on('player_init', function (player_1_datas) {
    console.log("player_init :", player_1_datas);
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
    console.log("match init datas : ", players_datas);
    var player_2 = Object.assign(new Player, players_datas.datas);
    player_2._deck = constructDeckFromJSON(player_2);

    match1 = new Match(5000, player_1, player_2, level);
    match1.clearValues();
    match1.reincrementValues();
    var player2View = rivets.bind($('#player-2-section'), match1._players[1]);
    var player2Dice1 = rivets.bind($('#player-2-roller .dice-viewer[dice-id="0"]'), player_2.getDiceOnDeck(0,0));
    var player2Dice2 = rivets.bind($('#player-2-roller .dice-viewer[dice-id="1"]'), player_2.getDiceOnDeck(0,1));
    var player2Dice3 = rivets.bind($('#player-2-roller .dice-viewer[dice-id="2"]'), player_2.getDiceOnDeck(0,2));
    var player2Dice4 = rivets.bind($('#player-2-roller .dice-viewer[dice-id="3"]'), player_2.getDiceOnDeck(0,3));
    var player2Dice5 = rivets.bind($('#player-2-roller .dice-viewer[dice-id="4"]'), player_2.getDiceOnDeck(0,4));
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
                socket.emit('player_ready_for_match');
            });
    },1000);
    //FAIRE UN ROLL
    console.log("contenu de res roll :", res_roll);

});

socket.on('everyone_ready_for_match', function (players_datas) {
    console.log("players rolls %o", players_datas);
    var rolls = JSON.parse(players_datas.datas);
    autoRoll(rolls);
});

socket.on('spectator_init', function (players_datas) {
    console.log("spectator init datas : ", players_datas);
    var player_1 = Object.assign(new Player, players_datas.datas[0]);
    player_1._deck = constructDeckFromJSON(player_1);
    var player_2 = Object.assign(new Player, players_datas.datas[1]);
    player_2._deck = constructDeckFromJSON(player_2);

    match1 = new Match(5000, player_1, player_2, level);
    match1.clearValues();
    match1.reincrementValues();
    var player2View = rivets.bind($('#player-1-section'), match1._players[0]);
    var player2View = rivets.bind($('#player-2-section'), match1._players[1]);
});

socket.on('disconnect', function () {
    console.log('you have been disconnected : ' + player_1.id);
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

var matchTime = 15;
var timeout;
function startTimer() {
    document.getElementById('time-count').innerHTML = matchTime;
    matchTime--;
    if (matchTime <= 0) {
        if (isStillReroll()) {
            new Noty({
                type: 'warning',
                layout: 'topRight',
                text: "Timer is up !",
                timeout: 5000,
                progressBar: true,
            }).show();
                prepareRoll();
        }
        else {
            new swal ({
                    title: "Fin du tour",
                    type: "success",
                    showCancelButton: true,
                    confirmButtonColor: "#3F8F4E",
                    confirmButtonText: "Lancer la résolution",
                    closeOnConfirm: true
                },
                function () {
                    setTimeout(function () {
                        solve();
                    }, 500)
                });
        }
    }
    else {
        timeout = setTimeout(startTimer, 1000);
    }
}

function stopTimer() {
    clearTimeout(timeout);
}

function reInitTimer() {
    matchTime = match1.players[0].tourTime;
    // <div id="time-count"></div>/<div id="time-total"></div>
    $('#time-count').html(matchTime);
    $('#time-total').html(matchTime);
}

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
                        setTimeout(function () {
                            $("#roller-button").animateCss("pulse");
                            setTimeout(function () {
                                $("#ready-button").animateCss("pulse");
                            }, 250);
                        }, 250);
                    }, 250);
                }, 250);
            }, 250);
        }, 250);
    }, 250);
}

function callbackRefreshInterface() {
    console.log("Refresh interface");
    $(".dice-viewer").removeClass("disabled");
    $(".dice-viewer").addClass("spell-hidden");
    
    var player_id = 1;
    match1.players.forEach(function (player) {
        var dice_id = 0;
        player.deck[0].forEach(function (dice) {
            if (!dice.isActive()) {
                $('#player-' + player_id + '-roller .dice-viewer[dice-id="' + dice_id + '"]').addClass("disabled");
            }
            dice_id++;
        })
        player_id++;
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
    prepareRoll();
    console.log("Prepare roll : "+player_1.id);
});

$("#solve-button").click(function () {
    socket.emit('player_ready_for_solve');
});


$("#player-1-roller .dice-viewer").click(function () {
    var dice_id = $(this).attr("dice-id");
    var player_id = $(this).parent().parent().attr("player-id");
    var dice = match1.players[player_id - 1].getDiceOnDeck(0, dice_id);

    if (dice.reroll > 0 && dice.isActive())
        $(this).toggleClass("selected");
});

function prepareRoll() {
    var rnd_j1 = [null, null, null, null, null];
    $("#player-1-roller .dice-viewer.selected").each(function () {
        var dice_id = $(this).attr("dice-id");
        var dice = match1.players[0].getDiceOnDeck(0, dice_id);
        var rnd = Math.floor(Math.random() * 6) + 0;

        if (dice.reroll > 0 && dice.isActive()) {
            rnd_j1[dice_id] = rnd;
        }
    });
    socket.emit('my_roll_ready', rnd_j1);
    new Noty({
        type: 'success',
        layout: 'topRight',
        text: ("Your reroll is ready"),
        timeout: 5000,
        progressBar: true,
    }).show();
}

socket.on('launch_solve', function () {
    solve();
});

socket.on('opponent_roll_ready', function (players_datas) {
    new Noty({
        type: 'information',
        layout: 'topRight',
        text: ("Opponent roll is ready"),
        timeout: 5000,
        progressBar: true,
    }).show();
    socket.emit('opponent_roll_ready', players_datas);
});

socket.on('everyone_rolls_ready', function (players_datas) {
    console.log("players rolls %o", players_datas);
    var rolls = JSON.parse(players_datas.datas);
    autoRoll(rolls);
});

socket.on('iam_ready', function (players_datas) {
    console.log("players rolls %o", players_datas);
});

socket.on("user_left",function()
{
    console.log("user "+player_1.id+" left reload page");
    location.reload();
})

function solve() {
    stopTimer();
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

    console.log("rolling dices");
    new Noty({
        type: 'success',
        layout: 'topRight',
        text: ("Launching the dices"),
        timeout: 5000,
        progressBar: true,
    }).show();

    $(".dice-viewer").each(function () {

        var dice_id = $(this).attr("dice-id");
        var player_id = $(this).parent().parent().attr("player-id");
        var player = match1.players[player_id - 1];
        var dice = player.getDiceOnDeck(0, dice_id);

        if (dice.reroll > 0 && dice.isActive()) {
            //player -= 1;
            if (rolls["player_" + player.id][dice_id] != null) {
                if ((player_id - 1) == 0) {
                    tab_tirage_random[(player_id - 1)][dice_id] = rolls["player_" + player.id][dice_id];
                    $('#player-' + player_id + '-roller .dice-viewer[dice-id="' + dice_id + '"]').attr("roll-val",rolls["player_" + player.id][dice_id]);
                    $('#player-' + player_id + '-roller .dice-viewer[dice-id="' + dice_id + '"] .face-name').html(dice.getFaceByPosition(rolls["player_" + player.id][dice_id]).name);
                    $('#player-' + player_id + '-roller .dice-viewer[dice-id="' + dice_id + '"]').removeClass("spell-hidden");
                    //setDiceFace(player_id, dice_id, player.getDiceOnDeck(0, dice_id).getFaceByPosition(tab_tirage_random[(player_id - 1)][dice_id]).sprite, 700);
                }
                if ((player_id - 1) == 1) {
                    tab_tirage_random[(player_id - 1)][dice_id] = rolls["player_" + player.id][dice_id];
                    $('#player-' + player_id + '-roller .dice-viewer[dice-id="' + dice_id + '"]').attr("roll-val",rolls["player_" + player.id][dice_id]);
                    $('#player-' + player_id + '-roller .dice-viewer[dice-id="' + dice_id + '"] .face-name').html(dice.getFaceByPosition(rolls["player_" + player.id][dice_id]).name);
                    $('#player-' + player_id + '-roller .dice-viewer[dice-id="' + dice_id + '"]').removeClass("spell-hidden");
                    //setDiceFace(player_id, dice_id, player.getDiceOnDeck(0, dice_id).getFaceByPosition(tab_tirage_random[(player_id - 1)][dice_id]).sprite, 700);
                }
            }
        }
    });
    match1.players[0].decreaseAllDiceReroll();
    match1.players[1].decreaseAllDiceReroll();

    reInitTimer();
    startTimer();


    $(".dice-viewer").removeClass("selected");
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