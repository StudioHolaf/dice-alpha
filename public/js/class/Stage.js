/**
 * Created by Algost on 19/04/2017.
 */

class Stage
{

    constructor(id, bg, award, gravity)
    {
        this._id = id;
        this._background = bg;
        this._award = award;
        this._gravity = gravity;
    }

    get id()
    { return this._id;}

    set id(id)
    { this._id = id;}

    get background()
    { return this._background;}

    set background(bg)
    { this._background = bg;}

    get award()
    { return this._award;}

    set award(nb)
    { this._award = nb;}

    get gravity()
    { return this._gravity;}

    set gravity(gravity)
    { this._gravity = gravity;}

}