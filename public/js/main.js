// CE GENRE DE MEMO : MANA - COST - DEGAT - SHIELD - MULTI - REFLECT

//FACES

function constructDeckFromJSON(player)
{
    console.log("player player",player);

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

rivets.binders['pv-bar'] = function(el, value) {
    var pv = el.getAttribute("pv");
    var pvMax = el.getAttribute("pv-max");
    var percent = (pv / pvMax)*100;
    el.style.width = percent+"%";
};

rivets.binders['ultime-bar'] = function(el, value) {
    var ultime = el.getAttribute("ultime");
    var ultimeMax = el.getAttribute("ultime-max");
    var percent = (ultime / ultimeMax)*100;
    el.style.width = percent+"%";
};

rivets.binders['player-avatar'] = function(el, value){
    el.style.backgroundImage = "url('"+value+"')";
};

function getMatchIDByUrl(url)
{

}

var locationGetted = window.location.pathname;
var locationSplitted = locationGetted.split("/");
var roomid = locationSplitted[locationSplitted.length-1];
var player_1_id;

console.log("roomid ",roomid);

var socket = io.connect();

socket.emit('connection',roomid);

socket.on('ask_for_login',function()
{
    console.log("ask_for_login in room "+roomid);
    swal({
            title: "Welcome to dice!",
            text: "Enter user id",
            type: "input",
            showCancelButton: true,
            closeOnConfirm: true,
            animation: "slide-from-top",
            inputPlaceholder: "User id"
        },
        function(inputValue){
            if (inputValue === false) return false;

            if (inputValue === "") {
                swal.showInputError("You need to write something!");
                return false
            }
            console.log("user id : ",inputValue);
            player_1_id = parseInt(inputValue);
            socket.emit('player_connection', inputValue);
        });
})

var match1 = [];
var player_1;
socket.on('player_init', function (player_1_datas) {
    console.log("player_init :",player_1_datas);
    player_1 = Object.assign(new Player, player_1_datas.datas);
    player_1._deck = constructDeckFromJSON(player_1);
    var player1View = rivets.bind($('#player-1-section'), player_1);
});


socket.on('match_init',function(players_datas)
{
    console.log("match init datas : ",players_datas);
    var player_2 = Object.assign(new Player, players_datas.datas);
    player_2._deck = constructDeckFromJSON(player_2);

    match1 = new Match(5000, player_1, player_2, level);
    match1.clearValues();
    match1.reincrementValues();
    var player2View = rivets.bind($('#player-2-section'), match1._players[1]);
});

socket.on('spectator_init',function(players_datas)
{
    console.log("spectator init datas : ",players_datas);
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
    log('you have been disconnected');
});

matchTime = 60;
var timeout;
function startTimer() {
    document.getElementById('time-count').innerHTML = matchTime;
    matchTime--;
    if (matchTime <= 0) {
        swal({
                title: "Fin du tour",
                type: "success",
                showCancelButton: true,
                confirmButtonColor: "#3F8F4E",
                confirmButtonText: "Lancer la résolution",
                closeOnConfirm: true
            },
            function(){
                setTimeout(function()
                {
                    match1.solve(tab_tirage_random,callbackRefreshInterface);
                },500)
            });
    }
    else {
        timeout = setTimeout(startTimer, 1000);
    }
}

function stopTimer()
{
    clearTimeout(timeout);
}

function reInitTimer()
{
    matchTime = 60;
}

function changePlayerData(player_number, data_name, number)
{
    console.log("change player "+player_number+" "+data_name+" by "+number)
    var max_number = parseInt($("#player-"+player_number+"-section .player-"+data_name+"-bar").attr("max-value"));
    var current_number = parseInt($("#player-"+player_number+"-section .player-"+data_name+"-bar").attr("current-value"));
    var new_number = current_number + number;
    $("#player-"+player_number+"-section .player-"+data_name+"-bar").attr("current-value",new_number);
    var percent = (new_number / max_number) * 100;
    $("#player-"+player_number+"-section .player-"+data_name+"-bar").width(percent+"%");
    $("#player-"+player_number+"-section .player-"+data_name+"-current").html(new_number);
    if(data_name == "PV")
        $("#player-"+player_number+"-section .player-avatar").animateCss("shakeMini");
}

function changePlayerDataTo(player_number, data_name, newPV)
{
    console.log("change player "+player_number+" "+data_name+" to "+newPV)
    if(player_number == "1")
        var otherPlayer = 2;
    if(player_number == "2")
        var otherPlayer = 1;
    var max_number = parseInt($("#player-"+player_number+"-section .player-"+data_name+"-bar").attr("max-value"));
    var new_number = newPV;
    $("#player-"+player_number+"-section .player-"+data_name+"-bar").attr("current-value",new_number);
    var percent = (new_number / max_number) * 100;
    $("#player-"+player_number+"-section .player-"+data_name+"-bar").width(percent+"%");
    $("#player-"+player_number+"-section .player-"+data_name+"-current").html(new_number);
    if(match1.players[player_number-1].pv <= 0)
    {
        swal({
                title: "Player "+otherPlayer+" Wins !!!",
                type: "success",
                showCancelButton: true,
                confirmButtonColor: "#3F8F4E",
                confirmButtonText: "Rejouer le match",
                closeOnConfirm: true
            },
            function(){
                setTimeout(function()
                {
                    //match1.solve(tab_tirage_random,callbackRefreshInterface);
                },500)
            });
    }

}

function initInterface()
{
    /*$("#player-1-section .player-name").html(j1.pseudo);
    $("#player-1-section .player-hero").html(j1.hero);
    $("#player-1-section .player-gold").html(j1.gold);
    $("#player-1-section .player-PV-current").html(j1.pv);
    $("#player-1-section .player-PV-initial").html(j1.pv);
    $("#player-1-section .player-PV-bar").attr("initial-value",j1.pv);
    $("#player-1-section .player-PV-bar").attr("current-value",j1.pv);
    $("#player-1-section .player-ultime-current").html(0);
    $("#player-1-section .player-ultime-initial").html(100);
    $("#player-1-section .player-ultime-bar").attr("initial-value",0);
    $("#player-1-section .player-ultime-bar").attr("current-value",0);

    $("#player-2-section .player-name").html(bot1.pseudo);
    $("#player-2-section .player-hero").html(bot1.hero);
    $("#player-2-section .player-gold").html("no gold");
    $("#player-2-section .player-PV-current").html(bot1.pv);
    $("#player-2-section .player-PV-initial").html(bot1.pv);
    $("#player-1-section .player-PV-bar").attr("initial-value",j1.pv);
    $("#player-2-section .player-PV-bar").attr("current-value",j1.pv);
    $("#player-2-section .player-ultime-current").html(0);
    $("#player-2-section .player-ultime-initial").html(100);
    $("#player-2-section .player-ultime-bar").attr("initial-value",0);
    $("#player-2-section .player-ultime-bar").attr("current-value",0);*/

    setTimeout(function()
    {
        $(".dices-viewer-container .dice-viewer:nth-child(1)").animateCss("pulse");
        setTimeout(function()
        {
            $(".dices-viewer-container .dice-viewer:nth-child(2)").animateCss("pulse");
            setTimeout(function()
            {
                $(".dices-viewer-container .dice-viewer:nth-child(3)").animateCss("pulse");
                setTimeout(function()
                {
                    $(".dices-viewer-container .dice-viewer:nth-child(4)").animateCss("pulse");
                    setTimeout(function()
                    {
                        $(".dices-viewer-container .dice-viewer:nth-child(5)").animateCss("pulse");
                    },250);
                },250);
            },250);
        },250);
    },250);
}

function callbackRefreshInterface() {
    console.log("callbackRefreshInterface");
    $(".face-spell").css("background-image","none");

    $(".dice-viewer").removeClass("disabled");

    var player_id = 1;
    match1.players.forEach(function(player)
    {
        var dice_id = 0;
        player.deck[0].forEach(function(dice)
        {
            if(!dice.isActive())
            {
                $('#player-'+player_id+'-roller .dice-viewer[dice-id="'+dice_id+'"]').addClass("disabled");
            }
            dice_id++;
        })
        player_id++;
    });
}

initInterface();

function setDiceFace(player_number,dice_id,face_img,animationTime)
{
    setTimeout(function()
    {
        $('#player-'+player_number+'-roller .dice-viewer[dice-id="'+dice_id+'"] .face-spell').css("background-image","url('"+face_img+"')");
    },animationTime)

    $('#player-'+player_number+'-roller .dice-viewer[dice-id="'+dice_id+'"]').animateCss("flip");
}

function drawDices(tab_faces, player, player_number)
{
    setTimeout(function()
    {
        setDiceFace(player_number,0,player.getDiceOnDeck(0, 0).getFaceByPosition(tab_faces[0]).sprite,700);
        setTimeout(function()
        {
            setDiceFace(player_number,1,player.getDiceOnDeck(0,1).getFaceByPosition(tab_faces[1]).sprite,700);
            setTimeout(function()
            {
                setDiceFace(player_number,2,player.getDiceOnDeck(0,2).getFaceByPosition(tab_faces[2]).sprite,700);
                setTimeout(function()
                {
                    setDiceFace(player_number,3,player.getDiceOnDeck(0,3).getFaceByPosition(tab_faces[3]).sprite,700);
                    setTimeout(function()
                    {
                        setDiceFace(player_number,4,player.getDiceOnDeck(0,4).getFaceByPosition(tab_faces[4]).sprite,700);
                    },250);
                },250);
            },250);
        },250);
    },250);
}

var tab_tirage_random = [];

$("#roller-button").click(function()
{
    roll();
});

$("#solve-button").click(function()
{
    stopTimer();
    changePlayerData(1,"ultime",10);
    changePlayerData(2,"ultime",10);
    $(".dice-viewer").removeClass("selected");
    if(tab_tirage_random.length > 0) {
        match1.solve(tab_tirage_random,callbackRefreshInterface);
        tab_tirage_random = [];
    }
});

$("#json-button").click(function()
{
    var player1StateJson = j1.getStateJSON();
    console.log("player1StateJson  %o",player1StateJson);
    socket.emit('jsonState', player1StateJson);
    new Noty({
        type: 'error',
        layout: 'topRight',
        text: ("J'envoie un state : "+player1StateJson),
        timeout: 5000,
        progressBar: true,
    }).show();
    var player1RollerJson = j1.getRollerJSON();
    console.log("player1StateJson  %o",player1RollerJson);
    socket.emit('jsonRoller', player1RollerJson);
    new Noty({
        type: 'error',
        layout: 'topRight',
        text: ("J'envoie un roller : "+player1RollerJson),
        timeout: 5000,
        progressBar: true,
    }).show();
});


$("#player-1-roller .dice-viewer").click(function () {
    var dice_id = $(this).attr("dice-id");
    var player_id = $(this).parent().parent().attr("player-id");
    var dice = match1.players[player_id-1].getDiceOnDeck(0, dice_id);

    if (dice.reroll > 0 && dice.isActive())
        $(this).toggleClass("selected");
});

function roll()
{
    if(tab_tirage_random.length <= 0)
    {
        reInitTimer();
        var rnd_res_j1 = [0,0,0,0,0];
        var rnd_res_bot1 = [0,0,0,0,0];
        tab_tirage_random = [rnd_res_j1, rnd_res_bot1];
        startTimer();
    }

    if ($(".selected").length <= 0)
    {
        $("#player-1-roller .dice-viewer").each(function () {

            var dice_id = $(this).attr("dice-id");
            var player_id = $(this).parent().parent().attr("player-id");
            var player = match1.players[player_id-1];
            var dice = player.getDiceOnDeck(0, dice_id);
            var rnd =  Math.floor(Math.random() * 6) + 0;

            if (dice.reroll > 0 && dice.isActive()) {

                console.log("player ID: " + player_id);
                //player -= 1;
                if ((player_id - 1) == 0) {
                    tab_tirage_random[(player_id - 1)][dice_id] = rnd;
                    setDiceFace(player_id, dice_id, player.getDiceOnDeck(0, dice_id).getFaceByPosition(tab_tirage_random[(player_id - 1)][dice_id]).sprite, 700);
                }
                if ((player_id - 1) == 1) {
                    tab_tirage_random[(player_id - 1)][dice_id] = rnd;
                    setDiceFace(player_id, dice_id, player.getDiceOnDeck(0, dice_id).getFaceByPosition(tab_tirage_random[(player_id - 1)][dice_id]).sprite, 700);
                }
            }
        });

        match1.players[0].decreaseAllDiceReroll();
        match1.players[1].decreaseAllDiceReroll();

    }
    else
    {
        var j1Rolled = false;
        var j2Rolled = false;
        $(".dice-viewer.selected").each(function () {

            var dice_id = $(this).attr("dice-id");
            var player_id = $(this).parent().parent().attr("player-id");
            var player = match1.players[player_id-1];
            var dice = player.getDiceOnDeck(0, dice_id);
            var rnd =  Math.floor(Math.random() * 6) + 0;
            if(player_id == "1")
                j1Rolled = true;
            if(player_id == "2")
                j2Rolled = true;
            console.log("player ID: "+player_id);
            //player -= 1;
            if (dice.reroll > 0) {
                if ((player_id - 1) == 0) {
                    tab_tirage_random[(player_id - 1)][dice_id] = rnd;
                    setDiceFace(player_id, dice_id, player.getDiceOnDeck(0, dice_id).getFaceByPosition(tab_tirage_random[(player_id - 1)][dice_id]).sprite, 700);
                }
                if ((player_id - 1) == 1) {
                    tab_tirage_random[(player_id - 1)][dice_id] = rnd;
                    setDiceFace(player_id, dice_id, player.getDiceOnDeck(0, dice_id).getFaceByPosition(tab_tirage_random[(player_id - 1)][dice_id]).sprite, 700);
                }
            }
        });
        if(j1Rolled)
            match1.players[0].decreaseAllDiceReroll();
        if(j2Rolled)
            match1.players[1].decreaseAllDiceReroll();
    }

    $(".dice-viewer").removeClass("selected");
    //startTimer();
    return [rnd_res_j1,rnd_res_bot1]
}



bg_music = new Audio('/assets/music/dice_theme_1.mp3');
bg_music.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);
bg_music.play();

$("#sound-controller").click(function()
{
    if(!$(this).hasClass("shutted")) {
        bg_music.pause();
        $(this).addClass("shutted")
    }
    else {
        bg_music.play();
        $(this).removeClass("shutted");
    }
})