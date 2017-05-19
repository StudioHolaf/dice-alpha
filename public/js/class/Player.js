/**
 * Created by Algost on 19/04/2017.
 */

class Player extends Challenger{

    constructor(id, pv, pvMax, deck ,hero, avatar, pseudo, ownedface, adventureprogress, gold) {

        super(id, pv, pvMax, deck ,hero, avatar, pseudo)
        {
            this._id = id;
            this._pv = pv;
            this._pvMax = pvMax;
            this._deck = deck;
            this._hero = hero;
            this._avatar = avatar;
            this._pseudo = pseudo;
        }
        this._ownedFaces = ownedface;
        this._adventureProgress = adventureprogress;
        this._gold = gold;

        if (id != null)
        {
            if ( ownedface == null && adventureprogress == null && gold == null && pv == null && deck == null && hero == null)
            {
                /* SET EN BASE DE DONNEE */
                this._ownedFaces = "toto";
                this._adventureProgress = 0;
                this._avatar = "toto";
                this._gold = 0;
                this._pv = 100;
                this.deck = [];
                this._hero = "Batman";
                this._pseudo = "Bob Steroid";
            }
        }
    }

    get pseudo() {
        return this._pseudo;
    }

    set pseudo(pseudo)
    { this._pseudo = pseudo;}

    get ownedFaces() {
        return this._ownedFaces;
    }

    set ownedFaces(ownedfaces) {
        this._ownedFaces = ownedfaces;
    }

    get adventureProgress() {
        return this._adventureProgress
    }

    set adventureProgress(adventureprogress) {
        this._adventureProgress = adventureprogress;
    }

    get avatar() {
        return this._avatar;
    }

    set avatar(avatar) {
        this._avatar = avatar;
    }

    get gold() {
        return this._gold
    }

    set gold(gold) {
        this._gold = gold;
    }

    getStateJSON() {

        var arrayJSON = {};
            arrayJSON.playerPosition = this._id;
            arrayJSON._id = this._id;
            arrayJSON._pv = this._pv;
            arrayJSON._pvMax = this._pvMax;
            arrayJSON._hero = this._hero;
            arrayJSON._avatar = this._avatar;
            arrayJSON._pseudo = this._pseudo;
            arrayJSON._reroll = this._reroll;
            arrayJSON._tourTime = this._tourTime;
            arrayJSON._ownedFaces = this._ownedFaces;
            arrayJSON._adventureProgress = this._adventureProgress;
            arrayJSON._gold = this._gold;
        return (JSON.stringify(arrayJSON));
    }

    getRollerJSON()
    {
        var arrayJSON = {};
        arrayJSON._dices = [];
        var tmp = [];
        for(var i = 0; i < 5; i++)
        {
            tmp = this._deck[0][i].getDiceStateJSON();
            arrayJSON._dices.push(tmp);
        }
        console.log("Roller JSON : %o",arrayJSON);
        return (JSON.stringify(arrayJSON));
    }
}
