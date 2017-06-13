/**
 * Created by Thibaut on 04/05/2017.
 */


//////////////////////////////////////////////////////////////////////////////
////////////////// INIT PART BEGIN ///////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

function initPlayerTab()
{
    var initialized_array = [];

    initialized_array.offensive = initOffensiveTab();
    initialized_array.defensive = initDefensiveTab();
    initialized_array.neutral = initNeutralTab();

    return initialized_array;
}

function initTabMana() {
    var mana = {};
    mana.wind = 0;
    mana.fire = 0;
    mana.water = 0;
    mana.mountain = 0;

    return mana;
}

function initTabAll() {
    var mana = [];
    mana.wind = 0;
    mana.fire = 0;
    mana.water = 0;
    mana.mountain = 0;
    mana.arcane = 0;

    return mana;
}

function initOffensiveElementTab()
{
    var initialized_array = [];

    initialized_array.mana = [];
    initialized_array.degat = [];
    initialized_array.multiplicator = [];

    return initialized_array;
}

function initDefensiveElementTab()
{
    var initialized_array = [];

    initialized_array.shield = [];
    initialized_array.reflect = [];

    return initialized_array;
}

function initOffensiveTab()
{
    var initialized_array = [];

    initialized_array.wind = initOffensiveElementTab();
    initialized_array.fire = initOffensiveElementTab();
    initialized_array.water = initOffensiveElementTab();
    initialized_array.mountain = initOffensiveElementTab();
    initialized_array.arcane = initOffensiveElementTab();

    return initialized_array;
}

function initDefensiveTab()
{
    var initialized_array = [];

    initialized_array.fire = initDefensiveElementTab();
    initialized_array.wind = initDefensiveElementTab();
    initialized_array.water = initDefensiveElementTab();
    initialized_array.mountain = initDefensiveElementTab();
    initialized_array.arcane = initDefensiveElementTab();

    return initialized_array;
}

function initNeutralTab()
{
    var initialized_array = [];

    initialized_array.reroll = [];
    initialized_array.heal = [];
    initialized_array.time = [];
    initialized_array.disabledDice = [];

    return initialized_array;
}


//////////////////////////////////////////////////////////////////////////////
////////////////// INIT PART END /////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
////////////////// CONCAT PART BEGIN /////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

function concatOffensiveSubEffect(tab1, tab2)
{
    var arr_tmp = initOffensiveElementTab();

    arr_tmp.mana = tab1.mana.concat(tab2.mana);
    arr_tmp.degat = tab1.degat.concat(tab2.degat);
    arr_tmp.multiplicator = tab1.multiplicator.concat(tab2.multiplicator);

    return arr_tmp;
}

function concatDefensiveSubEffect(tab1, tab2)
{
    var arr_tmp = initOffensiveElementTab();

    arr_tmp.shield = tab1.shield.concat(tab2.shield);
    arr_tmp.reflect = tab1.reflect.concat(tab2.reflect);

    return arr_tmp;
}

function concatNeutralSubEffect(tab1, tab2)
{
    //CONCAT TOUS LES NEUTRALS EFFECT D'UN SPELL

    var arr_tmp = initNeutralTab();

    arr_tmp.reroll = tab1.reroll.concat(tab2.reroll);
    arr_tmp.heal = tab1.heal.concat(tab2.heal);
    arr_tmp.time = tab1.time.concat(tab2.time);
    arr_tmp.disabledDice = tab1.disabledDice.concat(tab2.disabledDice);

    return arr_tmp;
}

function concatSpellEffects(tab1, tab2, playerIndex, diceIndex) //final tabJ? - currentFace
{

    //CONCAT TOUS LES SPELLS D'UNE MEME FACE

    var arr_tmp = [];
    arr_tmp.offensive = initOffensiveTab();
    arr_tmp.defensive = initDefensiveTab();
    arr_tmp.neutral = initNeutralTab();
    arr_tmp.id = tab1.id;
    var offensives = tab2.getSpellOffensivesSubEffects(playerIndex, diceIndex);
    var defensives = tab2.getSpellDefensivesSubEffect(playerIndex, diceIndex);
    var neutrals = tab2.getSpellSubNeutralEffect(playerIndex, diceIndex);

    //FIRE
    arr_tmp.offensive.fire = concatOffensiveSubEffect(tab1.offensive.fire, offensives.fire);
    arr_tmp.defensive.fire = concatDefensiveSubEffect(tab1.defensive.fire, defensives.fire);

    //WIND
    arr_tmp.offensive.wind = concatOffensiveSubEffect(tab1.offensive.wind, offensives.wind);
    arr_tmp.defensive.wind = concatDefensiveSubEffect(tab1.defensive.wind, defensives.wind);

    //WATER
    arr_tmp.offensive.water = concatOffensiveSubEffect(tab1.offensive.water, offensives.water);
    arr_tmp.defensive.water = concatDefensiveSubEffect(tab1.defensive.water, defensives.water);

    //MOUNTAIN
    arr_tmp.offensive.mountain = concatOffensiveSubEffect(tab1.offensive.mountain, offensives.mountain);
    arr_tmp.defensive.mountain = concatDefensiveSubEffect(tab1.defensive.mountain, defensives.mountain);

    //ARCANE
    arr_tmp.offensive.arcane = concatOffensiveSubEffect(tab1.offensive.arcane, offensives.arcane);

    //NEUTRAL
    arr_tmp.neutral = concatNeutralSubEffect(tab1.neutral, neutrals.neutral);

    return arr_tmp;
}

function concatEffectArray(tab1, tab2) //final tabJ? - currentFace
{
    //CONCAT TOUS LES EFFECTS OFFENSIVE ET DEFENSIVE D'UN SPELL

    var arr_tmp = {};
    arr_tmp.offensive = initOffensiveTab();
    arr_tmp.defensive = initDefensiveTab();
    arr_tmp.neutral = initNeutralTab();
    arr_tmp.id = tab1.id;

    //FIRE
    arr_tmp.offensive.fire = concatOffensiveSubEffect(tab1.offensive.fire, tab2.offensive.fire);
    arr_tmp.defensive.fire = concatDefensiveSubEffect(tab1.defensive.fire, tab2.defensive.fire);

    //WIND
    arr_tmp.offensive.wind = concatOffensiveSubEffect(tab1.offensive.wind, tab2.offensive.wind);
    arr_tmp.defensive.wind = concatDefensiveSubEffect(tab1.defensive.wind, tab2.defensive.wind);

    //WATER
    arr_tmp.offensive.water = concatOffensiveSubEffect(tab1.offensive.water, tab2.offensive.water);
    arr_tmp.defensive.water = concatDefensiveSubEffect(tab1.defensive.water, tab2.defensive.water);

    //MOUNTAIN
    arr_tmp.offensive.mountain = concatOffensiveSubEffect(tab1.offensive.mountain, tab2.offensive.mountain);
    arr_tmp.defensive.mountain = concatDefensiveSubEffect(tab1.defensive.mountain, tab2.defensive.mountain);

    //ARCANE
    arr_tmp.offensive.arcane = concatOffensiveSubEffect(tab1.offensive.arcane, tab2.offensive.arcane);

    //NEUTRAL
    arr_tmp.neutral = concatNeutralSubEffect(tab1.neutral, tab2.neutral);

    return arr_tmp;
}

//////////////////////////////////////////////////////////////////////////////
////////////////// CONCAT PART END ///////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

function isEnoughElementsCost(tab1, tab2) //tableau de coup - tableau de ma mana
{
    if (Math.abs(tab1.wind) > tab2.wind)
        return false;
    if (Math.abs(tab1.fire) > tab2.fire)
        return false;
    if (Math.abs(tab1.water) > tab2.water)
        return false;
    if (Math.abs(tab1.mountain) > tab2.mountain)
        return false;
    if (Math.abs(tab1.arcane) > tab2.arcane)
        return false;
    return true;
}

function additionnateElementsProperty(tab1, tab2) //manas, effect.getManas()
{
    var tab_res = {};

    tab_res.wind = tab1.wind += tab2.wind;
    tab_res.fire = tab1.fire += tab2.fire;
    tab_res.water = tab1.water += tab2.water;
    tab_res.mountain = tab1.mountain += tab2.mountain;
    tab_res.arcane = tab1.arcane += tab2.arcane;

    return tab_res;
}

function sortIndexByDesc(tab)
{
    var self = tab;
    tab.desc = !tab.desc;
    return tab.sort(function (l, r) {
        return l > r ? (self.asc ? 1 : -1) : l < r ? (self.asc ? -1 : 1) : 0;
    });
}

function deleteUsedEffect(toDeleteEffectIndexes, tab_player_effects) { //FONCTION POUR VIDER NOS TABLEAUX

    var sorted_indexes_array = sortIndexByDesc(toDeleteEffectIndexes);


    sorted_indexes_array.forEach(function (effectToDeleteIndex){
        tab_player_effects.splice(effectToDeleteIndex, 1);
    });

    return tab_player_effects;
}