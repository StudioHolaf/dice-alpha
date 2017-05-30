/**
 * Created by Algost on 19/04/2017.
 */

class Match
{

    constructor(id, player1, player2, stage)
    {
        this._id = id;
        this._players = [player1, player2];
        this._stage = new Stage(stage);
        this._final_tab = this.initFinalTab();
        this._history = this.initFinalTab();
    }

    get id()
    { return this._id;}

    set id(id)
    {this._id = id; }

    get players()
    { return this._players;}

    set players(players)
    { this._players = players;}

    get stage()
    { return this._stage}

    set stage(stage)
    {this._stage = stage;}

    clearValues()
    {
        this._players.forEach(function(player)
        {
            player.deck[0].forEach(function(dice)
            {
                dice.reroll =  0;
                if(dice.turnDisabled > 0)
                    dice.decreaseTurnDisabled(1);
            })
        });
        console.log("Player 1 dices : %o ", this._players[0].deck[0]);
        console.log("Player 2 dices : %o ", this._players[1].deck[0]);

    }

    reincrementValues()
    {
        this._players.forEach(function(player)
        {
            player.deck[0].forEach(function(dice)
            {
                dice.reroll += player.reroll;
            })
        });
        console.log("Player 1 dices : %o ", this._players[0].deck[0]);
        console.log("Player 2 dices : %o ", this._players[1].deck[0]);
    }


    initFinalTab() {
        var final_tab = [];
        final_tab.j1 = initPlayerTab();
        final_tab.j1.id = 0;
        
        final_tab.j2 = initPlayerTab();
        final_tab.j2.id = 1;

        return final_tab;
    }

    diceAnimation(player_id, dice_id, type, value, callback)
    {
        if(value != 0) {
            console.log("Dice Animation - PLAYER ID " + player_id + " DICE ID " + dice_id + " value " + value);
            var positionX = $('#player-' + player_id + '-roller .dice-viewer[dice-id="' + dice_id + '"]').offset().left + $('#player-' + player_id + '-roller .dice-viewer[dice-id="' + dice_id + '"]').width() / 2;
            var positionY = $('#player-' + player_id + '-roller .dice-viewer[dice-id="' + dice_id + '"]').offset().top + $('#player-' + player_id + '-roller .dice-viewer[dice-id="' + dice_id + '"]').height() / 2;
            $("#player-" + player_id + "-section .player-avatar").animateCss("shakeMini");
            if (type == "diceDisabled") {
                $('#player-' + player_id + '-roller .dice-viewer[dice-id="' + dice_id + '"]').animateCss("flip");
                $('#player-' + player_id + '-roller .dice-viewer[dice-id="' + dice_id + '"]').addClass("disabled");
                $('#player-' + player_id + '-roller .dice-viewer[dice-id="' + dice_id + '"] .face-spell').css("background-image", "none");
                ;
            }
            launchParticles("#game-canvas", positionX, positionY, 30, type, value, function () {
                if (typeof callback === "function");
                callback();
            });
        }
        if(value == 0)
        {
            if (typeof callback === "function");
                callback();
        }
    }

    healAnimation(player_id, dice_id, type, value, callback)
    {
        if(value != 0) {
            var positionX = $('#player-' + player_id + '-section .player-avatar').offset().left +  $('#player-' + player_id + '-section .player-avatar').width() / 2;
            var positionY =  $('#player-' + player_id + '-section .player-avatar').offset().top +  $('#player-' + player_id + '-section .player-avatar').height() / 2;
            $("#player-" + player_id + "-section .player-avatar").animateCss("shakeMini");
            launchParticles("#game-canvas", positionX, positionY, 30, type, value, function () {
                if (typeof callback === "function");
                callback();
            });
        }
        if(value == 0)
        {
            if (typeof callback === "function");
            callback();
        }
    }

    playerAnimation(dgtsToMe, dgtsToOtherPlayer, currentPlayerId, otherPlayerId, type, callback)
    {
        //ANIMATION
        if (dgtsToOtherPlayer > 0 && dgtsToMe > 0) { //QD TU RECOIS DES DGT ET REFLECT UNE PARTIE MAIS T'EN PREND QD MEME
            var positionX = $("#player-" + currentPlayerId + "-section .player-avatar").offset().left + ($("#player-" + currentPlayerId + "-section .player-avatar").width() / 2);
            var positionY = $("#player-" + currentPlayerId + "-section .player-avatar").offset().top + ($("#player-" + currentPlayerId + "-section .player-avatar").height() / 2);
            $("#player-" + currentPlayerId + "-section .player-avatar").animateCss("shakeMini");
            launchParticles("#game-canvas", positionX, positionY, 30, type, -dgtsToMe, function(){});
            var positionX = $("#player-" + otherPlayerId + "-section .player-avatar").offset().left + ($("#player-" + otherPlayerId + "-section .player-avatar").width() / 2);
            var positionY = $("#player-" + otherPlayerId + "-section .player-avatar").offset().top + ($("#player-" + otherPlayerId + "-section .player-avatar").height() / 2);
            $("#player-" + otherPlayerId + "-section .player-avatar").animateCss("shakeMini");
            launchParticles("#game-canvas", positionX, positionY, 30, type, -dgtsToOtherPlayer, function () {
                if (typeof callback === "function");
                callback();
            });
        }
        if (dgtsToOtherPlayer > 0 && dgtsToMe <= 0) { // TU REFLECT TOUT
            var positionX = $("#player-" + otherPlayerId + "-section .player-avatar").offset().left + ($("#player-" + otherPlayerId + "-section .player-avatar").width() / 2);
            var positionY = $("#player-" + otherPlayerId + "-section .player-avatar").offset().top + ($("#player-" + otherPlayerId + "-section .player-avatar").height() / 2);
            launchParticles("#game-canvas", positionX, positionY, 30, type, -dgtsToOtherPlayer, function () {
                if (typeof callback === "function");
                callback();
            });
            $("#player-" + otherPlayerId + "-section .player-avatar").animateCss("shakeMini");
        }

        if (dgtsToOtherPlayer <= 0 && dgtsToMe > 0) { //QD TU RECOIS DES DEGATS SANS EN INFLIGER
            var positionX = $("#player-" + currentPlayerId + "-section .player-avatar").offset().left + ($("#player-" + currentPlayerId + "-section .player-avatar").width() / 2);
            var positionY = $("#player-" + currentPlayerId + "-section .player-avatar").offset().top + ($("#player-" + currentPlayerId + "-section .player-avatar").height() / 2);
            launchParticles("#game-canvas", positionX, positionY, 30, type, -dgtsToMe, function () {
                if (typeof callback === "function");
                callback();
            });
            $("#player-" + currentPlayerId + "-section .player-avatar").animateCss("shakeMini");
        }

        if(dgtsToOtherPlayer <= 0 && dgtsToMe <= 0)
        {
            if (typeof callback === "function");
            callback();
        }
    }

    applyNeutral(tab_player, callback)
    {
        console.log("apply neutral");
        var classScope = this;
        var dice = 0;
        var toDeleteEffectIndexes = initNeutralTab();
        var indexReroll = 0;
        var indexTime = 0;
        var indexDisableDice = 0;
        var totalReroll = 0;
        var newTime = 0;
        var totalDisabledDice = 0;
        var launcherPlayer = 0;
        var launcherDicePosition = 0;
        var rnd = 0;
        classScope._players[tab_player.id].reroll = 3;
        tab_player.neutral.reroll.forEach(function(effect) {
            if (effect.getType() == "reroll" && effect.turnCountDown == 0) {
                classScope._players[tab_player.id].changeRerollBy(effect.reroll);
                totalReroll += effect.reroll;
                launcherPlayer = effect.playerIndex;
                launcherDicePosition = effect.diceIndex;
            }
            effect.decreaseTurn();
            if (effect.nbTour <= 0)
                toDeleteEffectIndexes["reroll"].push(indexReroll);
            indexReroll++;
            effect.decreaseTurnCountDown();
        });
        tab_player.neutral.time.forEach(function(effect) {
            if (effect.getType() == "time" && effect.turnCountDown == 0) {
                classScope._players[tab_player.id].changeTimeBy(effect.time);
                newTime += effect.time;
                launcherPlayer = effect.playerIndex;
                launcherDicePosition = effect.diceIndex;
            }
            effect.decreaseTurn();
            if (effect.nbTour <= 0 && effect.turnCountDown == 0)
                toDeleteEffectIndexes["time"].push(indexTime);
            indexTime++;
        });
        console.log("tab_player.neutral.disabledDice.length = "+tab_player.neutral.disabledDice.length);
        tab_player.neutral.disabledDice.forEach(function(effect) {
            if (effect.getType() == "disabledDice" && effect.turnCountDown == 0) {
                rnd = Math.floor(Math.random() * 5) + 0;
                dice = classScope._players[tab_player.id].getDiceOnDeck(0, rnd);
                dice.turnDisabled = effect.disabledDice;
                totalDisabledDice += effect.disabledDice;
            }
            effect.decreaseTurn();
            if (effect.nbTour <= 0 && effect.turnCountDown == 0)
                toDeleteEffectIndexes["disabledDice"].push(indexDisableDice);
            indexDisableDice++;
        });

        var yolo = 1;
        //ANIMATIONS
        var waitAnim = 0;
        if (totalReroll != 0)
        {
            var waitAnim = 1500;
            if (totalReroll > 0)
            {
                console.log("Player "+(tab_player.id+1)+" earn "+(totalReroll)+" reroll for the next round");
                new Noty({
                    type: 'error',
                    layout: 'topRight',
                    text: ("Player "+(tab_player.id+1)+" earn "+totalReroll+" reroll for the next round"),
                    timeout: 5000,
                    progressBar: true,
                }).show();
                this.diceAnimation(tab_player.id+1, launcherDicePosition, "bonusReroll", totalReroll, callback);
            }
            if (totalReroll < 0)
            {
                console.log("Player "+(tab_player.id+1)+" lose "+(totalReroll)+" reroll for the next round");
                new Noty({
                    type: 'error',
                    layout: 'topRight',
                    text: ("Player "+(tab_player.id+1)+" lose "+totalReroll+" reroll for the next round"),
                    timeout: 5000,
                    progressBar: true,
                }).show();
                this.diceAnimation(tab_player.id+1, launcherDicePosition, "dotReroll", totalReroll, callback);
            }
        }
        else if (newTime > 0)
        {
            var waitAnim = 1500;
            console.log("Player "+(tab_player.id+1)+" change time to "+newTime+" be careful !");
            new Noty({
                type: 'error',
                layout: 'topRight',
                text: ("Player "+(tab_player.id+1)+" change time to "+newTime+" be careful !"),
                timeout: 5000,
                progressBar: true,
            }).show();
            callback();
        }
        else if (totalDisabledDice > 0)
        {
            var waitAnim = 1500;
            console.log("Player "+(tab_player.id+1)+" lose(s) "+totalDisabledDice+" dice(s) !");
            new Noty({
                type: 'error',
                layout: 'topRight',
                text: ("Player "+(tab_player.id+1)+" lose(s) "+totalDisabledDice+" dice(s) !"),
                timeout: 5000,
                progressBar: true,
            }).show();
            this.diceAnimation(tab_player.id+1, rnd, "diceDisabled", totalDisabledDice, callback);
        }
        else
        {
            if (typeof callback === "function");
            callback();
        }
        //this.playerAnimation(dgt_expo,0,tab_player.id+1,other_player_id+1,"arcane",callback);
        for (var key in toDeleteEffectIndexes)
        {
            classScope._history.push(tab_player.neutral[key]);
            tab_player.neutral[key] = deleteUsedEffect(toDeleteEffectIndexes[key], tab_player.neutral[key]);
        }
    }
    
    applyHeal(tab_player, callback)
    {
        console.log("applyHeal");
        var classScope = this;
        var toDeleteEffectIndexes = [];
        var tmp_heal = 0;
        var index = 0;
        var launcherDicePosition = 0;
        tab_player.neutral.heal.forEach(function(effect) {
            if (effect.heal > 0 && effect.turnCountDown == 0)
            {
                launcherDicePosition = effect.heal.diceIndex;
                while (effect.heal > 0)
                {
                    effect.heal--;
                    if (classScope._players[tab_player.id].pv + tmp_heal < classScope._players[tab_player.id].pvMax)
                        tmp_heal++;
                }
            }
            effect.nbTour -= 1;
            if (effect.nbTour <= 0)
                toDeleteEffectIndexes.push(index);
            index++;
            effect.decreaseTurnCountDown();
        });

        //ANIMATIONS
        if (tmp_heal > 0)
        {
            console.log("Healing "+tmp_heal+" to player "+(tab_player.id+1));
            new Noty({
                type: 'error',
                layout: 'topRight',
                text: "Player "+(tab_player.id+1)+" heal himself by "+tmp_heal+"",
                timeout: 5000,
                progressBar: true,
            }).show();
            //MAJ PV PLAYER

            classScope._players[tab_player.id].pv += tmp_heal;
        }

        this.healAnimation(tab_player.id+1, launcherDicePosition, "heal", tmp_heal, callback);
        //DELETE EFFECT
        classScope._history.push(tab_player.neutral.heal);
        tab_player.neutral.heal = deleteUsedEffect(toDeleteEffectIndexes, tab_player.neutral.heal);
    }

    applyAttackArcane(tab_player, callback)
    {
        console.log("apply arcane");
        var classScope = this;
        var dgts = 0;
        var dgt_expo = 0;
        var index = 0;
        var toDeleteEffectIndexes = initOffensiveElementTab();
        var total_dgt = 0;
        var elements = ["wind", "fire", "water", "mountain"];
        var other_player_id  = (tab_player.id == 0 ? 1 : 0);

        //PARCOURT LES DGTS UNE PREMIERE FOIS
        tab_player.offensive.arcane.degat.forEach(function(effect) {
            dgts = effect.degat;
            effect.nbTour -= 1;
            if (effect.nbTour <= 0 && effect.turnCountDown == 0)
                toDeleteEffectIndexes["degat"].push(index);
            index++;
            total_dgt += dgts;
            effect.decreaseTurnCountDown();
        });
        if (total_dgt > 0)
            dgt_expo = Math.pow(2, total_dgt); //GROS C'EST LA PUISSANCE

        //ON APPLIQUE 1 DGT ET RETIRE 1 DE SHIELD
        for (var h = 0; h < elements.length; h++)
        {
            if (tab_player.defensive[elements[h]].length > 0)
             {
                 while (tab_player.defensive[elements[h]][0].shield > 0 && dgt_expo > 0)
                    {
                        dgt_expo--;
                     tab_player.defensive[elements[h]][0].decreaseShield();
                     if(tab_player.defensive[elements[h]][0].shield < 1)
                     {
                         tab_player.defensive[elements[h]].shift();
                         if(tab_player.defensive[elements[h]].length < 1)
                         break;
                     }
                 }
             }
        }

        //MAJ PV PLAYER
        if(dgt_expo > 0)
        {
            console.log("Inflicting "+dgt_expo+" degats of arcane to player "+(tab_player.id+1));
            new Noty({
                type: 'error',
                layout: 'topRight',
                text: "Inflicting "+dgt_expo+" degats of arcane to player "+(tab_player.id+1),
                timeout: 5000,
                progressBar: true,
            }).show();
            classScope._players[tab_player.id].pv -= dgt_expo;

        }
        this.playerAnimation(dgt_expo,0,tab_player.id+1,other_player_id+1,"arcane",callback);
        //DELETE SPELL OF ARCANE
        classScope._history.push(tab_player.offensive.arcane.degat);
        tab_player.offensive.arcane.degat = deleteUsedEffect(toDeleteEffectIndexes.degat, tab_player.offensive.arcane.degat);
    }
    
    applyAttack(tab_player, elemFlag, callback) {
        console.log("apply attack");
        var classScope = this;
        var dgts = 0;
        var dgts_current = 0;
        var dgtToOtherPlayer = 0;
        var index = 0;
        var toDeleteEffectIndexes = initOffensiveElementTab();
        var other_player_id  = (tab_player.id == 0 ? 1 : 0);

        /* Loop over the different offensive effects */
        tab_player.offensive[elemFlag].degat.forEach(function(effect) {

            /* START HANDLE DEGAT + STACK */
            if(effect.degat > 0 && effect.turnCountDown == 0) {
                dgts_current = effect.degat;
                console.log("Trying to inflict " + effect.degat + " degats of " + elemFlag + " to player " + (tab_player.id + 1));
                if (tab_player.defensive[elemFlag].reflect.length > 0) {
                    /* Loop over the different reflect effects */
                    while (tab_player.defensive[elemFlag].reflect[0].reflect > 0 && dgts_current > 0) {
                        dgtToOtherPlayer++;
                        tab_player.defensive[elemFlag].reflect[0].decreaseReflect();
                        if (tab_player.defensive[elemFlag].reflect[0].reflect < 1) {
                            tab_player.defensive[elemFlag].reflect.shift();
                            if (tab_player.defensive[elemFlag].reflect.length < 1) {
                                console.log("reflecting " + dgtToOtherPlayer + " degats of " + elemFlag + " to player " + (other_player_id + 1));
                                new Noty({
                                    type: 'warning',
                                    layout: 'topRight',
                                    text: "reflecting " + dgtToOtherPlayer + " degats of " + elemFlag + " to player " + (other_player_id + 1),
                                    timeout: 5000,
                                    progressBar: true,
                                }).show();
                                break;
                            }
                        }
                    }
                }
                /* Loop over the different shield effects */
                if (tab_player.defensive[elemFlag].shield.length > 0) {
                    while (tab_player.defensive[elemFlag].shield[0].shield > 0 && dgts_current > 0) {
                        dgts--;
                        tab_player.defensive[elemFlag].shield[0].decreaseShield();
                        if (tab_player.defensive[elemFlag].shield[0].shield < 1) {
                            tab_player.defensive[elemFlag].shield.shift();
                            if (tab_player.defensive[elemFlag].shield.length < 1) {
                                console.log("Player " + (tab_player.id + 1) + " shielding " + dgtToOtherPlayer + " degats of " + elemFlag);
                                new Noty({
                                    type: 'warning',
                                    layout: 'topRight',
                                    text: "Player " + (tab_player.id + 1) + " shielding " + dgtToOtherPlayer + " degats of " + elemFlag,
                                    timeout: 5000,
                                    progressBar: true,
                                }).show();
                                break;
                            }
                        }
                    }
                }
                dgts += dgts_current;
            }
            effect.decreaseTurnCountDown();

            /* END HANDLE DEGAT + STACK */

            /* START HANDLE MULTIPLICATOR */
            if(effect.multiplicator > 0) {
                
            }
            /* END HANDLE MULTIPLICATOR */
            
            effect.nbTour -= 1;
            if (effect.nbTour <= 0)
            {
                toDeleteEffectIndexes["degat"].push(index);
            }
            index++;
        });


        //MAJ PV OF PLAYER
        if (dgtToOtherPlayer > 0)
            classScope._players[other_player_id].pv -= dgtToOtherPlayer;
        if(dgts > 0) {
            classScope._players[tab_player.id].pv -= dgts;
            console.log("Remove "+dgts+" PV of "+elemFlag+" to player "+(tab_player.id+1));
            new Noty({
                type: 'error',
                layout: 'topRight',
                text: "Player " + "Remove "+dgts+" PV of "+elemFlag+" to player "+(tab_player.id+1),
                timeout: 5000,
                progressBar: true,
            }).show();
        }
        this.playerAnimation(dgts,dgtToOtherPlayer,tab_player.id+1,other_player_id+1,elemFlag,callback);
        //DELETE SPELL AFTER USING THEM
        for (var key in toDeleteEffectIndexes)
        {
            classScope._history.push(tab_player.offensive[elemFlag][key]);
            tab_player.offensive[elemFlag][key] = deleteUsedEffect(toDeleteEffectIndexes[key], tab_player.offensive[elemFlag][key]);
        }
    }

    consummateMana(tab1, tab2) //SOUSTRACTION DE MANA POUR PAYER LE SORT
    {
        tab2.wind = tab1.wind + tab2.wind;
        tab2.fire = tab1.fire + tab2.fire;
        tab2.water = tab1.water + tab2.water;
        tab2.mountain = tab1.mountain + tab2.mountain;
        tab2.arcane = tab1.arcane + tab2.arcane;

        return tab2;
    }

    solve(tab_res,callback) {
        var res_j1 = tab_res[0]; //face qui sont sortis J1
        var res_j2 = tab_res[1]; //face qui sont sortis J2

        var manaJ1 = initTabMana(); //On set les valeurs à 0
        var manaJ2 = initTabMana();//On set les valeurs à 0


        for (var i = 0; i < 5; i++) //On rÃ©cupÃ¨re tout sur la mana et on la stock
        {
            var diceJ1 = this._players[0].getDiceOnDeck(0, i);
            var diceJ2 = this._players[1].getDiceOnDeck(0, i);

            if(diceJ1.isActive() == true && res_j1[i] >= 0)
            {
                var current_faceJ1 = diceJ1.getFaceByPosition(res_j1[i]);
                var manaSpellCurrentJ1 = current_faceJ1.getFaceManas(); //on rÃ©cupÃ¨re un tablau de nos manas
                manaJ1 = additionnateElementsProperty(manaJ1, manaSpellCurrentJ1); //lÃ  on concatÃ¨ne avec notre tableau iniatilisÃ© avant
            }

            if(diceJ2.isActive() == true && res_j1[i] >= 0)
            {
                var current_faceJ2 = diceJ2.getFaceByPosition(res_j2[i]);
                var manaSpellCurrentJ2 = current_faceJ2.getFaceManas();
                manaJ2 = additionnateElementsProperty(manaJ2, manaSpellCurrentJ2);
            }

        }

        console.log("Mana J1 : %o",manaJ1 );
        console.log("Mana J2 : %o",manaJ2 );

        for (var diceIndex = 0; diceIndex < 5; diceIndex++) {

            var diceJ1 = this._players[0].getDiceOnDeck(0, diceIndex); //on choppe le dÃ¨
            var diceJ2   = this._players[1].getDiceOnDeck(0, diceIndex);

            var current_faceJ1 = diceJ1.getFaceByPosition(res_j1[diceIndex]); //on choppe la face courante
            var current_faceJ2 = diceJ2.getFaceByPosition(res_j2[diceIndex]);

            //JOUEUR 1
            if(diceJ1.isActive() && res_j1[diceIndex] >= 0)
            {
                if (isEnoughElementsCost(current_faceJ1.getFaceCosts(), manaJ1)) { //si on peut payez la face du sort
                    manaJ1 = this.consummateMana(current_faceJ1.getFaceCosts(), manaJ1); //on fait la soustraction et met Ã  jour le nombre de mana
                    console.log("launch J1: "+diceJ1.getFaceByPosition((res_j1[diceIndex])).name); //on regarde ce qu'on lance !
                    this._final_tab.j1 = concatEffectArray(this._final_tab.j1, current_faceJ1.totalSpellOnMe(0, diceIndex)); //tous les sorts de type "SpellOnMe"
                    this._final_tab.j2 = concatEffectArray(this._final_tab.j2, current_faceJ1.totalSpellOpponent(1, diceIndex)); //tous les sorts de type "SpellOpponent"
                }
            }

            //JOUEUR 2
            if(diceJ2.isActive() && res_j1[diceIndex] >= 0)
            {
                if (isEnoughElementsCost(current_faceJ2.getFaceCosts(), manaJ2)) {
                    manaJ2 = this.consummateMana(current_faceJ2.getFaceCosts(), manaJ2);
                    console.log("launch J2: "+diceJ2.getFaceByPosition((res_j2[diceIndex])).name); //on regarde ce qu'on lance !
                    this._final_tab.j2 = concatEffectArray(this._final_tab.j2, current_faceJ2.totalSpellOnMe(1, diceIndex));
                    this._final_tab.j1 = concatEffectArray(this._final_tab.j1, current_faceJ2.totalSpellOpponent(0, diceIndex));
                }
            }
        }

        //ORDRE D'EXECUTION DES ELEMENTS : SOIN - VENT - FIRE - WATER - MOUNTAIN - ARCANE - NEUTRAL

        this.clearValues();

        var scope = this;
        console.log("tab Final : %o",this._final_tab );
            scope.applyHeal(scope._final_tab.j1, function () {
                    scope.applyHeal(scope._final_tab.j2, function () {
                        scope.applyAttack(scope._final_tab.j1, "wind", function () {
                            scope.applyAttack(scope._final_tab.j2, "wind", function () {
                                scope.applyAttack(scope._final_tab.j1, "fire", function () {
                                    scope.applyAttack(scope._final_tab.j2, "fire", function () {
                                        scope.applyAttack(scope._final_tab.j1, "water", function () {
                                            scope.applyAttack(scope._final_tab.j2, "water", function () {
                                                scope.applyAttack(scope._final_tab.j1, "mountain", function () {
                                                    scope.applyAttack(scope._final_tab.j2, "mountain", function () {
                                                        scope.applyAttackArcane(scope._final_tab.j1, function () {
                                                            scope.applyAttackArcane(scope._final_tab.j2, function () {
                                                                scope.applyNeutral(scope._final_tab.j1, function () {
                                                                    scope.applyNeutral(scope._final_tab.j2, function () {
                                                                        scope.reincrementValues();
                                                                        callback();
                                                                    });
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });

    }
}