// CE GENRE DE MEMO : MANA - COST - DEGAT - SHIELD - MULTI - REFLECT

//FACES

    //MANA
        var mana_fire = new Face(1, "Mana Feu", "./img/fc_fire_mana.png");
        var spell = new Spell();
        spell.setFireEffectsFromDatas(1,0,0,0,0,0);
        mana_fire.pushSpellOnMe(spell);

        var mana_vent = new Face(2, "Mana Vent", "./img/fc_wind_mana.png");
        var spell = new Spell();
        spell.setWindEffectsFromDatas(1,0,0,0,0,0);
        mana_vent.pushSpellOnMe(spell);

        var mana_eau = new Face(3, "Mana Eau", "./img/fc_water_mana.png");
        var spell = new Spell();
        spell.setWaterEffectsFromDatas(1,0,0,0,0,0);
        mana_eau.pushSpellOnMe(spell);

        var mana_terre = new Face(4, "Mana Terre", "./img/fc_mountain_mana.png");
        var spell = new Spell();
        spell.setMountainEffectsFromDatas(1,0,0,0,0,0);
        mana_terre.pushSpellOnMe(spell);

    //FEU
        var f_brulure = new Face(5, "Brulure", "./img/fc_fire_brulure.png"); // A VOIR PLUTOT JAMAIS !
        var spellCost = new Spell();
        var spellDot = new Spell();
        spellCost.setFireEffectsFromDatas(0,-1,0,0,0,0);
        f_brulure.pushSpellOnMe(spellCost);
        spellDot.setFireEffectsFromDatas(0,0,2,0,0,0);
        spellDot.fireEffects.nbTour = 2;
        spellDot.fireEffects.turnCountDown = 1;
        f_brulure.pushSpellOpponent(spellDot);

        var f_flamme = new Face(6, "Flamme", "./img/fc_fire_brulure.png");
        var spellCost = new Spell();
        var spellOpponent = new Spell();
        spellOpponent.setFireEffectsFromDatas(0,2,6,0,0,0);
        f_flamme.pushSpellOpponent(spellOpponent);
        spellCost.setFireEffectsFromDatas(0,-2,0,0,0,0);
        f_flamme.pushSpellOnMe(spellCost);

        var f_combustion = new Face(7, "Combustion", "./img/fc_fire_brulure.png");
        var spellCost = new Spell();
        var spellOpponent = new Spell();
        spellOpponent.setFireEffectsFromDatas(0,3,6,0,0,0); // SI ON A LA BRULURE ON A LA COMBUSTION
        f_combustion.pushSpellOpponent(spellOpponent);
        spellCost.setFireEffectsFromDatas(0,-3,0,0,0,0);
        f_combustion.pushSpellOnMe(spellCost);

        var f_fournaise = new Face(8, "Fournaise", "./img/fc_fire_brulure.png");
        var spellCost = new Spell();
        var spellOpponent = new Spell();
        spellOpponent.setFireEffectsFromDatas(0,4,25,0,0,0);
        f_fournaise.pushSpellOpponent(spellOpponent);
        spellCost.setFireEffectsFromDatas(0,-4,0,0,0,0);
        f_fournaise.pushSpellOnMe(spellCost);

    //VENT
        var f_bourasque = new Face(9, "Bourasque", "./img/fc_wind_bourasque.png");
        var spellCost = new Spell();
        var spellOpponent = new Spell();
        spellOpponent.setWindEffectsFromDatas(0,1,3,0,0,0);
        f_bourasque.pushSpellOpponent(spellOpponent);
        spellCost.setWindEffectsFromDatas(0,-1,0,0,0,0);
        f_bourasque.pushSpellOnMe(spellCost);

        var f_lameDeVent = new Face(10, "Lame De Vent", "./img/fc_wind_bourasque.png");
        var spellCost = new Spell();
        var spellOpponent = new Spell();
        spellOpponent.setWindEffectsFromDatas(0,2,6,0,0,0);
        f_lameDeVent.pushSpellOpponent(spellOpponent);
        spellCost.setWindEffectsFromDatas(0,-2,0,0,0,0);
        f_lameDeVent.pushSpellOnMe(spellCost);

        var f_zephyr = new Face(11, "Zephyr", "./img/fc_wind_bourasque.png");
        var spellCost = new Spell();
        var spellOpponent = new Spell();
        var spellNeutral = new Spell();
        spellOpponent.setWindEffectsFromDatas(0,3,8,0,0,0);
        f_zephyr.pushSpellOpponent(spellOpponent);
        spellCost.setWindEffectsFromDatas(0,-3,0,0,0,0);
        f_zephyr.pushSpellOnMe(spellCost);
        spellNeutral.setNeutralEffectsFromDatas(1, 0, 0, 0);//1 REROLL EN PLUS !
        f_zephyr.pushSpellOnMe(spellNeutral);

        var f_tornade = new Face(12, "Tornade", "./img/fc_wind_bourasque.png");
        var spellCost = new Spell();
        var spellOpponent = new Spell();
        spellOpponent.setWindEffectsFromDatas(0,4,25,0,0,0);
        f_tornade.pushSpellOpponent(spellOpponent);
        spellCost.setWindEffectsFromDatas(0,-4,0,0,0,0);
        f_tornade.pushSpellOnMe(spellCost);

    //EAU
        var f_deluge = new Face(13, "Deluge", "./img/fc_water_deluge.png");
        var spellCost = new Spell();
        var spellDeluge = new Spell();
        spellDeluge.setWaterEffectsFromDatas(0,0,1,0,0,0);
        spellDeluge.waterEffects.nbTour = 9999;
        f_deluge.pushSpellOpponent(spellDeluge);
        spellCost.setWaterEffectsFromDatas(0,-1,0,0,0,0);
        f_deluge.pushSpellOnMe(spellCost);

        var f_cure = new Face(14, "Cure", "./img/fc_water_deluge.png");
        var spellOnMe = new Spell();
        var spellCost = new Spell();
        spellCost.setWaterEffectsFromDatas(0,-2,0,0,0,0);
        f_cure.pushSpellOnMe(spellCost);
        spellOnMe.setNeutralEffectsFromDatas(0,5,0,0); //HEAL
        f_cure.pushSpellOnMe(spellOnMe);

        var f_torrent = new Face(15, "Torrent", "./img/fc_water_deluge.png");
        var spellCost = new Spell();
        var spellOpponent = new Spell();
        spellOpponent.setWaterEffectsFromDatas(0,3,11,0,0,0);
        f_torrent.pushSpellOpponent(spellOpponent);
        spellCost.setWaterEffectsFromDatas(0,-3,0,0,0,0);
        f_torrent.pushSpellOnMe(spellCost);

        var f_cascade = new Face(16, "Cascade", "./img/fc_water_deluge.png");
        var spellCost = new Spell();
        var spellOpponent = new Spell();
        spellOpponent.setWaterEffectsFromDatas(0,4,25,0,0,0);
        f_cascade.pushSpellOpponent(spellOpponent);
        spellCost.setWaterEffectsFromDatas(0,-4,0,0,0,0);
        f_cascade.pushSpellOnMe(spellCost);

    //MONTAGNE
        var f_tremblement = new Face(17, "Tremblement", "./img/fc_mountain_tremblement.png");
        var spellCost = new Spell();
        var spellOpponent = new Spell();
        spellOpponent.setMountainEffectsFromDatas(0,1,3,0,0,0);
        f_tremblement.pushSpellOpponent(spellOpponent);
        spellCost.setMountainEffectsFromDatas(0,-1,0,0,0,0);
        f_tremblement.pushSpellOnMe(spellCost);

        var f_eboulement = new Face(18, "Eboulement", "./img/fc_mountain_tremblement.png");
        var spellCost = new Spell();
        var spellOpponent = new Spell();
        spellOpponent.setMountainEffectsFromDatas(0,2,6,0,0,0);
        f_eboulement.pushSpellOpponent(spellOpponent);
        spellCost.setMountainEffectsFromDatas(0,-2,0,0,0,0);
        f_eboulement.pushSpellOnMe(spellCost);

        var f_sableMouvant = new Face(19, "Sable Mouvants", "./img/fc_mountain_tremblement.png");
        var spellCost = new Spell();
        var spellOpponent = new Spell();
        var spellNeutral = new Spell();
        spellOpponent.setMountainEffectsFromDatas(0,3,9,0,0,0);
        f_sableMouvant.pushSpellOpponent(spellOpponent);
        spellNeutral.setNeutralEffectsFromDatas(-1,0,0,0); // 1 REROLL EN MOINS !!
        f_sableMouvant.pushSpellOpponent(spellNeutral);
        spellCost.setMountainEffectsFromDatas(0,-3,0,0,0,0);
        f_sableMouvant.pushSpellOnMe(spellCost);

        var f_faille = new Face(20, "Faille", "./img/fc_mountain_tremblement.png");
        var spellCost = new Spell();
        var spellOpponent = new Spell();
        var spellNeutral = new Spell();
        spellOpponent.setMountainEffectsFromDatas(0,4,20,0,0,0);
        f_faille.pushSpellOnMe(spellCost);
        spellCost.setMountainEffectsFromDatas(0,-4,0,0,0,0);
        f_faille.pushSpellOpponent(spellOpponent);
        spellNeutral.setNeutralEffectsFromDatas(0,0,0,1);
        f_faille.pushSpellOpponent(spellNeutral);

    //SHIELD
        var f_shieldFire = new Face(22, "Bouclier Feu", "./img/fc_fire_shield.png");
        var spellOnMe = new Spell();
        var spellOpponent = new Spell();
        spellOnMe.setFireEffectsFromDatas(0,0,0,5,0,0);
        f_shieldFire.pushSpellOnMe(spellOnMe);

        var f_shieldWind = new Face(23, "Bouclier Vent", "./img/fc_wind_shield.png");
        var spellOnMe = new Spell();
        var spellOpponent = new Spell();
        spellOnMe.setWindEffectsFromDatas(0,0,0,5,0,0);
        f_shieldWind.pushSpellOnMe(spellOnMe);

        var f_shieldWater = new Face(24, "Bouclier Eau", "./img/fc_water_shield.png");
        var spellOnMe = new Spell();
        var spellOpponent = new Spell();
        spellOnMe.setWaterEffectsFromDatas(0,0,0,5,0,0);
        f_shieldWater.pushSpellOnMe(spellOnMe);

        var f_shieldMountain = new Face(25, "Bouclier Terre", "./img/fc_mountain_shield.png");
        var spellOnMe = new Spell();
        var spellOpponent = new Spell();
        spellOnMe.setMountainEffectsFromDatas(0,0,0,5,0,0);
        f_shieldMountain.pushSpellOnMe(spellOnMe);

    //ARCANE
        var f_arcane = new Face(26, "Arcane", "./img/fc_arcane.png");
        var spellOnMe = new Spell();
        var spellOpponent = new Spell();
        spellOpponent.setArcaneEffectsFromDatas(0,0,1,0,0,0);
        f_arcane.pushSpellOpponent(spellOpponent);

    //REFLECT
        var f_reflect = new Face(27, "Reflect Fire", "./img/fc_hypercube.jpg");
        var spellOnMe = new Spell();
        var spellOpponent = new Spell();
        spellOnMe.setFireEffectsFromDatas(0,0,0,2,0,2);
        f_reflect.pushSpellOnMe(spellOnMe);


// TABLEAU DE FACE DE DES - JOUEUR 1
var j1_d1_f = [f_arcane, mana_terre, mana_terre, mana_terre, f_arcane, mana_terre];
var j1_d2_f = [f_torrent, f_torrent, mana_terre, mana_terre, mana_eau, mana_eau];
var j1_d3_f = [mana_terre, mana_terre, mana_terre, mana_eau, mana_terre, f_arcane];
var j1_d4_f = [f_arcane, mana_terre, mana_terre, mana_terre, mana_terre, f_arcane];
var j1_d5_f = [f_sableMouvant, f_sableMouvant, f_sableMouvant, f_arcane, f_sableMouvant, f_shieldFire];

// TABLEAU DE FACE DE DES - BOT
var bot_d1_f = [f_cure, f_cure, mana_eau, mana_eau, mana_eau, mana_vent];
var bot_d2_f = [f_cure, f_zephyr, mana_vent, mana_eau, mana_eau, mana_vent];
var bot_d3_f = [f_cure, f_zephyr, mana_vent, mana_eau, mana_eau, mana_vent];
var bot_d4_f = [f_cure, f_zephyr, mana_vent, mana_eau, mana_eau, mana_vent];
var bot_d5_f = [f_zephyr, f_zephyr, mana_vent, mana_vent, mana_vent, mana_eau];

//  DES DU JOUEUR 1
var j1_dice1 = new Dice(30, "./img/vibranium.png", j1_d1_f, 1, 1, 41, "//", true, true, 555, 123, true, 45, 50, 800);
var j1_dice2 = new Dice(31, "./img/vibranium.png", j1_d2_f, 2, 1, 41, "//", true, true, 555, 123, true, 45, 50, 800);
var j1_dice3 = new Dice(32, "./img/vibranium.png", j1_d3_f, 3, 1, 41, "//", true, true, 555, 123, true, 45, 50, 800);
var j1_dice4 = new Dice(33, "./img/vibranium.png", j1_d4_f, 4, 1, 41, "//", true, true, 555, 123, true, 45, 50, 800);
var j1_dice5 = new Dice(34, "./img/vibranium.png", j1_d5_f, 5, 1, 41, "//", true, true, 555, 123, true, 45, 50, 800);

//  DES DU BOT
var bot_dice1 = new Dice(35, "./img/vibranium.png", bot_d1_f, 41, "//", true, true, 555, 123, true, 45, 50, 800);
var bot_dice2 = new Dice(36, "./img/vibranium.png", bot_d2_f, 41, "//", true, true, 555, 123, true, 45, 50, 800);
var bot_dice3 = new Dice(37, "./img/vibranium.png", bot_d3_f, 41, "//", true, true, 555, 123, true, 45, 50, 800);
var bot_dice4 = new Dice(38, "./img/vibranium.png", bot_d4_f, 41, "//", true, true, 555, 123, true, 45, 50, 800);
var bot_dice5 = new Dice(39, "./img/vibranium.png", bot_d5_f, 41, "//", true, true, 555, 123, true, 45, 50, 800);


// DECK j1
var j1_deck = [[j1_dice1, j1_dice2, j1_dice3, j1_dice4, j1_dice5]];

// DECK bot
var bot_deck = [[bot_dice1, bot_dice2, bot_dice3, bot_dice4, bot_dice5]];

// Stage
var level = new Stage(4000, "bg1", 1000, 800);

// JOUEURS
var j1 = new Player(1, 100, 100, j1_deck, "Ares", "./img/avatar-1.png", "Aktos", [], "DeGaulle, Resonnance", 10001);
j1.listenToPVChange(function()
{
    changePlayerDataTo(1,"PV",j1.pv);
});
var bot1 = new Bot(2, 100, 100, bot_deck, "Medusa", "./img/avatar-2.png", "Myree", [], "Portal 1, Portal 2", 1010);
bot1.listenToPVChange(function()
{
    changePlayerDataTo(2,"PV",bot1.pv);
});

// Match
var match1 = new Match(5000, j1, bot1, level);
match1.clearValues();
match1.reincrementValues();

//console.log(JSON.stringify(match1));


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
    $("#player-1-section .player-name").html(j1.pseudo);
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
    $("#player-2-section .player-ultime-bar").attr("current-value",0);

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

var socket = io.connect('0.0.0.0:8000');

socket.on('jsonState', function (data) {
    new Noty({
        type: 'error',
        layout: 'topRight',
        text: ("On nous a envoyé un message :"+data),
        timeout: 5000,
        progressBar: true,
    }).show();
});

socket.on('jsonRoller', function (data) {
    new Noty({
        type: 'error',
        layout: 'topRight',
        text: ("On nous a envoyé un message :"+data),
        timeout: 5000,
        progressBar: true,
    }).show();
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


$(".dice-viewer").click(function () {
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
        $(".dice-viewer").each(function () {

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



bg_music = new Audio('./music/dice_theme_1.mp3');
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