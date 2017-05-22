/**
 * Created by Algost on 19/04/2017.
 */

class Bot extends Challenger {

    constructor(id, pv, pvMax, ultime, ultimeMax, deck ,hero, avatar, pseudo, difficulty)
    {

        super(id, pv, pvMax, ultime, ultimeMax, deck ,hero, avatar, pseudo)
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
        }

        this._difficulty = difficulty;

        if (id != null)
        {
            if ( difficulty == null && idBot == null && pv == null && deck == null && hero == null)
            {
                /* SET EN BASE DE DONNEE */
               this._difficulty = 2;
                this._idBot = 8080;
                this._pv = 100;
                this._deck = "";
                this._hero = "Batman";
                this._pseudo = "Bob Steroid";
            }
        }
    }

    get id() {
        return this._id;
    }

    set id(id) {
        this._id = id;
    }

    get difficulty() {
        return this._difficulty;
    }

    set difficulty(difficulty) {
        this._difficulty = difficulty;
    }

    get pseudo() {
        return this._pseudo;
    }

    set pseudo(pseudo)
    { this._pseudo = pseudo;}
}