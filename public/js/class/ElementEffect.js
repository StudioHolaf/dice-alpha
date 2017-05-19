/**
 * Created by Algost on 20/04/2017.
 */

class ElementEffect extends SpellEffect
{

    constructor()
    {
        super()
        {

        }

        this._mana = 0;
        this._cost = 0;
        this._degat = 0;
        this._shield = 0;
        this._multiplicator = 0;
        this._reflect = 0;
    }

    get degat() {
        return this._degat;
    }

    set degat(dgt) {
        this._degat = dgt;
    }

    get shield() {
        return this._shield;
    }

    set shield(shield) {
        this._shield = shield;
    }

    get multiplicator() {
        return this._multiplicator;
    }

    set multiplicator(multi) {
        this._multiplicator = multi;
    }

    get cost() {
    return this._cost;
    }

    set cost(cost) {
        this._cost = cost;
    }

    get mana()
    {
        return this._mana;
    }

    set mana(mana) {
        this._mana = mana;
    }

    get reflect() {
        return this._reflect;
    }

    set reflect(reflect) {
        this._reflect = reflect;
    }

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    setAllElements(mana, cost, degat, shield, multiplicator, reflect)
    {
        this._mana = mana;
        this._cost = cost;
        this._degat = degat;
        this._shield = shield;
        this._multiplicator = multiplicator;
        this._reflect = reflect;
    }

    // CE GENRE DE MEMO : MANA - COST - DEGAT - SHIELD - MULTI - REFLECT

    getSubOffensiveElementEffects(playerIndex, diceIndex) {

        var resultat = [];

        resultat.mana = [];
        resultat.degat = [];
        resultat.multiplicator = [];

        if (this._mana < 0) {
            var elementEffect = new ElementEffect();
            elementEffect.setAllElements(this._mana,0,0,0,0,0);
            elementEffect.nbTour = this.nbTour;
            elementEffect.turnCountDown = this.turnCountDown;
            elementEffect.playerIndex = playerIndex;
            elementEffect.diceIndex = diceIndex;
            resultat.mana.push(elementEffect);
        }
        if (this._degat > 0) {
            var elementEffect = new ElementEffect();
            elementEffect.setAllElements(0,0,this._degat,0,0,0);
            elementEffect.nbTour = this.nbTour;
            elementEffect.turnCountDown = this.turnCountDown;
            elementEffect.playerIndex = playerIndex;
            elementEffect.diceIndex = diceIndex;
            resultat.degat.push(elementEffect);
        }
        if (this._multiplicator > 0) {
            var elementEffect = new ElementEffect();
            elementEffect.setAllElements(0,0,0,0,this._multiplicator,0);
            elementEffect.nbTour = this.nbTour;
            elementEffect.turnCountDown = this.turnCountDown;
            elementEffect.playerIndex = playerIndex;
            elementEffect.diceIndex = diceIndex;
            resultat.multiplicator.push(elementEffect);
        }

        return resultat;
    }

    getSubDefensiveElementEffects(playerIndex, diceIndex) {
        var res = [];

        res.shield = [];
        res.reflect = [];

        if (this._shield > 0) {
            var elementEffect = new ElementEffect();
            elementEffect.setAllElements(0,0,0,this._shield,0,0);
            elementEffect.nbTour = this.nbTour;
            elementEffect.turnCountDown = this.turnCountDown;
            elementEffect.playerIndex = playerIndex;
            elementEffect.diceIndex = diceIndex;
            res.shield.push(elementEffect);
        }

        if (this._reflect > 0) {
            var elementEffect = new ElementEffect();
            elementEffect.setAllElements(0,0,0,0,0, this._reflect);
            elementEffect.nbTour = this.nbTour;
            elementEffect.turnCountDown = this.turnCountDown;
            elementEffect.playerIndex = playerIndex;
            elementEffect.diceIndex = diceIndex;
            res.reflect.push(elementEffect);
        }
        return res;
    }

    increaseShield()
    {
        this._shield = this._shield + 1;
    }

    decreaseShield()
    {
        this._shield = this._shield - 1;
    }

    increaseReflect()
    {
        this._reflect = this._reflect + 1;
    }

    decreaseReflect()
    {
        this._reflect = this._reflect - 1;
    }

    getType()
    {
        if(this._mana > 0) return "mana";
        if(this._cost > 0) return "cost";
        if(this._degat > 0) return "degat";
        if(this._shield > 0) return "shield";
        if(this._multiplicator > 0) return "multiplicator";
        if(this._reflect > 0) return "reflect";
    }

}
