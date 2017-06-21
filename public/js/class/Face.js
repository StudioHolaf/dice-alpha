/**
 * Created by Algost on 19/04/2017.
 */

class Face {

    constructor(id, name, sprite) {
        this._id = id;
        this._name = name;
        this._sprite = sprite;
        this._spellOnMe = [];
        this._spellOpponent = [];
        this._description = "";
    }

    get description() {
        return this._description;
    }

    set description(desc) {
        this._description = desc;
    }

    get id() {
        return this._id;
    }

    set id(id) {
        this._id = id;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;
    }

    get sprite() {
        return this._sprite
    }

    set sprite(sprite) {
        this._sprite = sprite;
    }

    get spellOnMe() {
        return this._spellOnMe;
    }

    set spellOnMe(spell) {
        this._spellOnMe = spell;
    }

    get spellOpponent() {
        return this._spellOpponent;
    }

    set spellOpponent(spellOpo) {
        this._spellOpponent = spellOpo;
    }

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    pushSpellOnMe(spell) {
        this._spellOnMe.push(spell);
    }

    getSpellOnMeByPosition(index) {
        return this._spellOnMe[index];
    }

    pushSpellOpponent(spell) {
        this._spellOpponent.push(spell);
    }

    getSpellOnOpponentByPosition(index) {
        return this._spellOpponent[index];
    }

    getFaceManas() {
        var manas = initTabMana();
        this.spellOnMe.forEach(function (effect) {
            manas = additionnateElementsProperty(manas, effect.getManas());
        });
        return manas;
    }

    getFaceManasHtml() {
        var costs = initTabMana();
        var textReturned = "";
        this.spellOnMe.forEach(function (effect) {
            costs = additionnateElementsProperty(costs, effect.getCosts());
        });
        if (costs.wind != 0) {
            for(var i = 0; i < Math.abs(costs.wind); i++)
            {
                textReturned += '<img src="/assets/img/fc_wind_mana.png">';
            }
            //textReturned += manas.wind+" manas of wind ";
        }
        if (costs.fire != 0) {
            for(var i = 0; i < Math.abs(costs.fire); i++)
            {
                textReturned += '<img src="/assets/img/fc_fire_mana.png">';
            }
        }
        if (costs.water != 0) {
            for(var i = 0; i < Math.abs(costs.water); i++)
            {
                textReturned += '<img src="/assets/img/fc_water_mana.png">';
            }
        }
        if (costs.mountain != 0) {
            for(var i = 0; i < Math.abs(costs.mountain); i++)
            {
                textReturned += '<img src="/assets/img/fc_mountain_mana.png">';
            }
        }
        //console.log("manas : %o",costs);
        //console.log("textReturned = %o",textReturned);
       return textReturned;
    }
    getFaceDegatsHtml() {
        var degats = initTabAll();
        var textReturned = "";
        this.spellOpponent.forEach(function (effect) {
            degats = additionnateElementsProperty(degats, effect.getDgts());
        });
        if (degats.wind != 0) {
                textReturned += '<img src="/assets/img/fc_wind_bourasque.png">'+ "X"+ degats.wind;
        }
        if (degats.fire != 0) {
                textReturned += '<img src="/assets/img/fc_fire_brulure.png">'+ "X"+ degats.fire;
        }
        if (degats.water != 0) {
                textReturned += '<img src="/assets/img/fc_water_deluge.png">'+ "X"+ degats.water;
        }
        if (degats.mountain != 0) {
                textReturned += '<img src="/assets/img/fc_mountain_tremblement.png">'+ "X"+ degats.mountain;
        }
        if (degats.arcane != 0) {
            textReturned += '<img src="/assets/img/fc_arcane.png">'+ "X2^<sup>"+ degats.arcane+"</sup>";
        }
        //console.log("degats : %o",degats);
        //console.log("textReturned = %o",textReturned);
        return textReturned;
    }

    getFaceCosts() {
        var costs = initTabMana();
        this.spellOnMe.forEach(function (effect) {
            costs = additionnateElementsProperty(costs, effect.getCosts());
        });
        return costs;
    }

    getFaceDgts() {
        var degats = 0;
        this.spellOpponent.forEach(function (effect) {
            degats = additionnateElementsProperty(degats, effect.getDgts());
        });
        return degats;
    }

    totalSpellOnMe(playerIndex, diceIndex) {
        var arrayFinal = initPlayerTab();

        this._spellOnMe.forEach(function (effect) {
            arrayFinal = concatSpellEffects(arrayFinal, effect, playerIndex, diceIndex);
        });

        return arrayFinal;
    }

    totalSpellOpponent(playerIndex, diceIndex) {
        var arrayFinal = initPlayerTab();

        this._spellOpponent.forEach(function (effect) {
            arrayFinal = concatSpellEffects(arrayFinal, effect, playerIndex, diceIndex);
        });

        return arrayFinal;
    }

    getFaceJSON() {
        var arrayJSON = {};
        arrayJSON._id = this._id;
        arrayJSON._name = this._name;
        arrayJSON._sprite = this._sprite;
        return arrayJSON;
    }
}
