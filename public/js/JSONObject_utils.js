/**
 * Created by Algost on 06/06/2017.
 */
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

function constructFacesFromJSON(DiffArray)
{
    var DiffArrayObject = [];
    for (var i = 0; i < DiffArray.length; i++)
    {
        //console.log("DiffArrays : %o", DiffArray);
        var assignObject = Object.assign(new Face(), DiffArray[i]);
        console.log("DiffArray : %o", assignObject);
        assignObject._spellOnMe = [];
        assignObject._spellOpponent = [];

        DiffArray[i]._spellOnMe.forEach(function (spellOnMe) {

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

            assignObject._spellOnMe.push(current_spellOnMe);

        });
        DiffArray[i]._spellOpponent.forEach(function (spellOpponent) {
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

            assignObject._spellOpponent.push(current_spellOpponent);
        });
        DiffArrayObject.push(assignObject);
        console.log("DiffArrayObject : %o", DiffArrayObject[i]);
    }
    return DiffArrayObject;
}


