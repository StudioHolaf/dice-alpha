/**
 * Created by Algost on 19/04/2017.
 */

class Hero {

    constructor(id, name, spell) {
        this._id = id;
        this._name = name;
        this._spell = spell;
    }

    get id() {
        return this._id;
    }

    set id(id) {
        this._id = id;
    }

    get name()
    { return this._name; }

    set name(name)
    { this._name = name; }

    get spell()
    { return this._spell}

    set spell(spell)
    { this._spell = spell; }

}