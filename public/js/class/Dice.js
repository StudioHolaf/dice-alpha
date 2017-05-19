/**
 * Created by Algost on 19/04/2017.
 */

class Dice {

    constructor(id, skin, faces, idPM, body, castshadow, receiveshadow, geomety, material, visible, mass, inertia, scale) {
        this._id = id;
        this._skin = skin;
        this._faces = faces;
        this._physicalModel = new PhysicalModel(idPM, body, castshadow, receiveshadow, geomety, material, visible, mass, inertia, scale);
        this._turn_disabled = 0;
        this._nbReroll = 0;

        if (id != null)
        {
            if ( skin == null && faces == null && idPM == null && body == null && castshadow == null && receiveshadow == null && geomety == null && material == null && visible == null && mass == null && inertia == null && scale == null)
            {
                /* SET EN BASE DE DONNEE */
                this._skin = "";
                this._faces = "";
                this._idPM = "";
                this._body = "";
                this._castshadow = "";
                this._receiveshadow = "";
                this._geomety = "";
                this._material = "";
                this._visible = "";
                this._mass = "";
                this._inertia = "";
                this._scale = ""
            }
        }
    }

    get id() {
        return this._id;
    }

    set id(id) {
        this._id = id;
    }

    get skin() {
        return this._skin;
    }

    set skin(skin) {
        this._skin = skin;
    }

    get faces() {
        return this._faces;
    }

     getFaceByPosition(id) {
        return this._faces[id];
    }

    set faces(faces) {
        this._faces = faces;
    }

    get physicalModel() {
        return this._physicalModel
    }

    set physicalModel(physicalmodel) {
        this._physicalModel = physicalmodel;
    }

    get turnDisabled() {
        return this._turn_disabled;
    }

    set turnDisabled(disabled) {
        this._turn_disabled = disabled;
    }

    decreaseTurnDisabled(value)
    {
        this._turn_disabled -= value;
        if(this._turn_disabled < 0)
            this._turn_disabled = 0;
    }

    get reroll()
    {
        return this._nbReroll;
    }

    set reroll(reroll)
    {
        this._nbReroll = reroll;
    }

    decreaseReroll(value)
    {
        this._nbReroll -= value;
        if(this._nbReroll < 0)
            this._nbReroll = 0;
    }

    isActive()
    {
        if (this._turn_disabled == 0)
            return true;
        return false;
    }


    /*
     this._id = id;
     this._skin = skin;
     this._faces = faces;

     this._physicalModel = new PhysicalModel(idPM, body, castshadow, receiveshadow, geomety, material, visible, mass, inertia, scale);
     this._turn_disabled = 0;
     this._nbReroll = 0;
    */

    getDiceStateJSON()
    {
        var arrayJSON = {};
            arrayJSON._id = this._id;
        console.log(" Dice _id : "+ this._id);
        arrayJSON._skin = this._skin;
        arrayJSON._faces = [];
        arrayJSON._turn_disabled = this._turn_disabled;
        arrayJSON._nbReroll = this._nbReroll;
        arrayJSON._selected = false;
        arrayJSON._active = this.isActive();

        for(var i = 0; i < 6; i++)
        {
            var tmp = [];
            tmp[i] = this._faces[i].getFaceJSON();
            arrayJSON._faces.push(tmp);
        }
        return (arrayJSON);
    }

}