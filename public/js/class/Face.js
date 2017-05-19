/**
 * Created by Algost on 19/04/2017.
 */

class Face
{

    constructor(id, name, sprite)
    {
        this._id = id;
        this._name = name;
        this._sprite = sprite;
        this._spellOnMe = [];
        this._spellOpponent = [];
    }

    get id()
    { return this._id;}

    set id(id)
    { this._id = id;}

    get name()
    { return this._name;}

    set name(name)
    { this._name = name;}

    get sprite()
    { return this._sprite}

    set sprite(sprite)
    { this._sprite = sprite; }

    get spellOnMe()
    { return this._spellOnMe; }

    set spellOnMe(spell)
    { this._spellOnMe = spell;}

    get spellOpponent()
    { return this._spellOpponent; }

    set spellOpponent(spellOpo)
    { this._spellOpponent = spellOpo;}

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    pushSpellOnMe(spell)
    {
        this._spellOnMe.push(spell);
    }
    
    getSpellOnMeByPosition(index)
    {
        return this._spellOnMe[index];
    }

    pushSpellOpponent(spell)
    {
        this._spellOpponent.push(spell);
    }

    getSpellOnOpponentByPosition(index)
    {
        return this._spellOpponent[index];
    }
    
    getFaceManas()
    {
        var manas = initTabMana();
        this.spellOnMe.forEach(function(effect)
        {
            manas = additionnateElementsProperty(manas,effect.getManas());
        });
        return manas;
    }

    getFaceCosts()
    {
        var costs = initTabMana();
        this.spellOnMe.forEach(function(effect)
        {
            costs = additionnateElementsProperty(costs,effect.getCosts());
        });
        return costs;
    }

    totalSpellOnMe(playerIndex, diceIndex)
    {
        var arrayFinal = initPlayerTab();

        this._spellOnMe.forEach(function(effect){
            arrayFinal = concatSpellEffects(arrayFinal,effect,playerIndex,diceIndex);
        });

        return arrayFinal;
    }

    totalSpellOpponent(playerIndex, diceIndex)
    {
        var arrayFinal = initPlayerTab();

        this._spellOpponent.forEach(function(effect){
            arrayFinal = concatSpellEffects(arrayFinal,effect,playerIndex,diceIndex);
        });

        return arrayFinal;
    }

    getFaceJSON()
    {
        var arrayJSON = {};
            arrayJSON._id = this._id;
        //console.log("Face ID : "+arrayJSON._id);
            arrayJSON._name = this._name;
        //console.log("Face _name : "+arrayJSON._name);
             arrayJSON._sprite = this._sprite;
        //console.log("Face _sprite : "+arrayJSON._sprite);
        return arrayJSON;
    }
}
