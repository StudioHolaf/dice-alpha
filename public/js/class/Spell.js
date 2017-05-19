/**
 * Created by Algost on 20/04/2017.
 */

class Spell
{

    constructor()
    {
        this._fireEffects = new ElementEffect();
        this._waterEffects =  new ElementEffect();
        this._mountainEffects =  new ElementEffect();
        this._windEffects =  new ElementEffect();
        this._arcaneEffects = new ElementEffect();
        this._neutralEffects = new NeutralEffect();
    }

    get fireEffects() {
        return this._fireEffects;
    }
    
    set fireEffects(fire)
    {
        this._fireEffects = fire;
    }

    get waterEffects()
    {
        return this._waterEffects;
    }

    set waterEffects(water)
    {
        this._waterEffects = water;
    }

    get mountainEffects()
    {
        return this._mountainEffects;
    }

    set mountainEffects(mountain)
    {
        this._mountainEffects = mountain;
    }

    get windEffects()
    {
        return this._windEffects;
    }

    set windEffects(wind)
    {
        this._windEffects = wind;
    }

    get arcaneEffects()
    {
        return this._arcaneEffects;
    }

    set arcaneEffects(arcane)
    {
        this._arcaneEffects = arcane;
    }

    get neutralEffects()
    {
        return this._neutralEffects;
    }

    set neutralEffects(neutral)
    {
        this._neutralEffects = neutral;
    }

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    setFireEffectsFromDatas(mana, cost, degat, shield, multiplicator, reflect)
    {
        this._fireEffects = new ElementEffect();
        this._fireEffects.setAllElements(mana, cost,degat, shield, multiplicator, reflect);
    }

    setWaterEffectsFromDatas(mana, cost, degat, shield, multiplicator, reflect)
    {
        this._waterEffects = new ElementEffect();
        this._waterEffects.setAllElements(mana, cost, degat, shield, multiplicator, reflect);
    }

    setMountainEffectsFromDatas(mana, cost, degat, shield, multiplicator, reflect)
    {
        this._mountainEffects = new ElementEffect();
        this._mountainEffects.setAllElements(mana, cost, degat, shield, multiplicator, reflect);
    }

    setWindEffectsFromDatas(mana, cost, degat, shield, multiplicator, reflect)
    {
        this._windEffects = new ElementEffect();
        this._windEffects.setAllElements(mana, cost, degat, shield, multiplicator, reflect);
    }

    setArcaneEffectsFromDatas(mana, cost, degat, shield, multiplicator, reflect)
    {
        this._arcaneEffects = new ElementEffect();
        this._arcaneEffects.setAllElements(mana, cost, degat, shield, multiplicator, reflect);
    }

    setNeutralEffectsFromDatas(reroll, heal, time, disabledDice)
    {
        this._neutralEffects = new NeutralEffect();
        this._neutralEffects.setAllNeutral(reroll, heal, time, disabledDice);
    }

    getOffensives() {
        var result = [];
        result.wind = (this._windEffects.degat ? this._windEffects.degat : 0);
        result.fire = (this._fireEffects.degat ? this._fireEffects.degat : 0);
        result.water = (this._waterEffects.degat ? this._waterEffects.degat : 0);
        result.mountain = (this._mountainEffects.degat ? this._mountainEffects.degat : 0);
        result.arcane = (this._arcaneEffects.degat ? this._arcaneEffects.degat : 0);
        return result;
    }

    getDefensives() {
        var result = [];
        result.wind = (this._windEffects.shield ? this._windEffects.shield : 0);
        result.fire = (this._fireEffects.shield ? this._fireEffects.shield : 0);
        result.water = (this._waterEffects.shield ? this._waterEffects.shield : 0);
        result.mountain = (this._mountainEffects.shield ? this._mountainEffects.shield : 0);
        return result;
    }

    getManas () {
        var result = [];
        result.wind = (this._windEffects.mana ? this._windEffects.mana : 0);
        result.fire = (this._fireEffects.mana ? this._fireEffects.mana : 0);
        result.water = (this._waterEffects.mana ? this._waterEffects.mana : 0);
        result.mountain = (this._mountainEffects.mana ? this._mountainEffects.mana : 0);
        return result;
    }
    
    getCosts() {
        var res = [];

        res.fire = this._fireEffects.cost;
        res.wind = this._windEffects.cost;
        res.water = this._waterEffects.cost;
        res.mountain = this._mountainEffects.cost;
        res.arcane = this._arcaneEffects.cost;
        
        return res;
    }

    getSpellOffensivesSubEffects(playerIndex, diceIndex)
    {
        var res = [];

        res.fire = this._fireEffects.getSubOffensiveElementEffects(playerIndex, diceIndex);
        res.wind = this._windEffects.getSubOffensiveElementEffects(playerIndex, diceIndex);
        res.water = this._waterEffects.getSubOffensiveElementEffects(playerIndex, diceIndex);
        res.mountain = this._mountainEffects.getSubOffensiveElementEffects(playerIndex, diceIndex);
        res.arcane = this._arcaneEffects.getSubOffensiveElementEffects(playerIndex, diceIndex);

        return res;
    }

    getSpellDefensivesSubEffect(playerIndex, diceIndex) {

        var res = [];

        res.fire = this._fireEffects.getSubDefensiveElementEffects(playerIndex, diceIndex);
        res.wind = this._windEffects.getSubDefensiveElementEffects(playerIndex, diceIndex);
        res.water = this._waterEffects.getSubDefensiveElementEffects(playerIndex, diceIndex);
        res.mountain = this._mountainEffects.getSubDefensiveElementEffects(playerIndex, diceIndex);
        res.arcane = this._arcaneEffects.getSubDefensiveElementEffects(playerIndex, diceIndex);

        return res;
    }

    getSpellSubNeutralEffect(playerIndex, diceIndex) {

        var res = [];

        res.neutral = this._neutralEffects.getSubNeutralEffects(playerIndex, diceIndex);

        return res;
    }
}