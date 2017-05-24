/**
 * Created by Algost on 19/04/2017.
 */

class Challenger
{
    constructor(id, pv, pvMax, ultime, ultimeMax, deck ,hero, avatar, pseudo)
    {
        this._id = id;
        this._pv = pv;
        this._pvMax = pvMax;
        this._ultime = ultime;
        this._ultimeMax = ultimeMax;
        this._deck = deck;
        this._hero = hero;
        this._avatar = avatar;
        this._pseudo = pseudo;
        this._reroll = 3;
        this._tourTime = 15;
    }

    get id(){
        return this._id;
    }

    set id(id)
    {
        this._id = id;
    }

    get pv(){
        return this._pv;
    }

    set pv(pv)
    {
        this._pv = pv;
    }

    get deck(){
        return this._deck;
    }

    set deck(deck)
    {
        this._deck = deck;
    }

    get hero(){
        return this._hero
    }

    set hero(hero)
    {
        this._hero = hero;
    }

    get reroll()
    {
        return this._reroll;
    }

    set reroll(reroll)
    {
        this._reroll = reroll;
    }

    get tourTime()
    {
        return this._tourTime;
    }

    set tourTime(tourTime)
    {
        this._tourTime = tourTime;
    }

    getDiceOnDeck(deck, dice)
    {
        var deck = this._deck[deck];
        return deck[dice];
    }

    get pvMax()
    { return this._pvMax;}

    set pvMax(newPVMax)
    {this._pvMax = newPVMax;}
    
    listenToPVChange(callback)
    {
        watch(this, ["_pv"], callback);
    }

    changeRerollBy(reroll)
    {
        if (this._reroll > 0)
            this._reroll += reroll;
    }

    changeTimeBy(time)
    {
        if (this._tourTime > 0)
            this._tourTime += time;
    }

    decreaseAllDiceReroll()
    {
        this._deck.forEach(function(deck)
        {
            deck.forEach(function(dice)
            {
                dice.decreaseReroll(1);
            });
        });
    }
}