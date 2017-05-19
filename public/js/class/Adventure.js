/**
 * Created by Algost on 19/04/2017.
 */

class Adventure
{

    constructor(id, stages)
    {
        this._id = id;
        this._stages = stages;
    }

    get id()
    { return this._id;}

    set id(id)
    { this._id = id;}

    get stages()
    { return this._stages;}

    set stages(stages)
    {this._stages = stages;}
}
