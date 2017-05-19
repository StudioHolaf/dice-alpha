/**
 * Created by Algost on 25/04/2017.
 */

class NeutralEffect extends SpellEffect{

    constructor()
    {
        super()
        {

        }

        this._reroll = 0;
        this._heal = 0;
        this._time = 0;
        this._disabledDice = 0;
    }

    get reroll() {
        return this._reroll;
    }

    set reroll(reroll) {
        this._reroll = reroll;
    }

    get time()
    { return this._time;}

    set time(time)
    { this._time = time;}

    get heal() {
        return this._heal;
    }

    set heal(heal) {
        this._heal = heal;
    }

    get disabledDice()
    {return this._disabledDice;}

    set disabledDice(dice)
    {this._disabledDice = dice;}

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    setAllNeutral(reroll, heal, time, disabledDice) {
        this._reroll = reroll;
        this._heal = heal;
        this._time = time;
        this._disabledDice = disabledDice;
    }

    getSubNeutralEffects(playerIndex, diceIndex)
    {
        var res = [];

        res.reroll = [];
        res.heal = [];
        res.time = [];
        res.disabledDice = [];

        if (this._reroll != 0) {
            var neutralEffect = new NeutralEffect();
            neutralEffect.setAllNeutral(this._reroll,0,0,0);
            neutralEffect.nbTour = this.nbTour;
            neutralEffect.turnCountDown = this.turnCountDown;
            neutralEffect.playerIndex = playerIndex;
            neutralEffect.diceIndex = diceIndex;
            res.reroll.push(neutralEffect);
        }
        if (this._heal != 0) {
            var neutralEffect = new NeutralEffect();
            neutralEffect.setAllNeutral(0,this._heal,0,0);
            neutralEffect.nbTour = this.nbTour;
            neutralEffect.turnCountDown = this.turnCountDown;
            neutralEffect.playerIndex = playerIndex;
            neutralEffect.diceIndex = diceIndex;
            res.heal.push(neutralEffect);
        }
        if (this._time != 0) {
            var neutralEffect = new NeutralEffect();
            neutralEffect.setAllNeutral(0,0,this._time,0);
            neutralEffect.nbTour = this.nbTour;
            neutralEffect.turnCountDown = this.turnCountDown;
            neutralEffect.playerIndex = playerIndex;
            neutralEffect.diceIndex = diceIndex;
            res.time.push(neutralEffect);
        }

        if (this._disabledDice != 0) {
            var neutralEffect = new NeutralEffect();
            neutralEffect.setAllNeutral(0,0,0,this._disabledDice);
            neutralEffect.nbTour = this.nbTour;
            neutralEffect.turnCountDown = this.turnCountDown;
            neutralEffect.playerIndex = playerIndex;
            neutralEffect.diceIndex = diceIndex;
            res.disabledDice.push(neutralEffect);
        }
        return res;
    }

    getType()
    {
        if(this._reroll != 0) return "reroll";
        if(this._heal != 0) return "heal";
        if(this._time != 0) return "time";
        if(this._disabledDice != 0) return "disabledDice";
    }
}