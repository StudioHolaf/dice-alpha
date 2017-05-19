/**
 * Created by Algost on 25/04/2017.
 */

class SpellEffect {

    constructor()
    {
        this._nbTour = 1; //nb de tour que le sort reste en place
        /*this._launcherPosition = 0;
        this._launcherPlayer= 0;*/
        this._turnCountDown = 0;
    }

    get nbTour() {
        return this._nbTour;
    }

    set nbTour(tour)
    {
        this._nbTour = tour;
    }

    decreaseTurn()
    {
        this._nbTour -= 1;
        if (this._nbTour < 0)
            this._nbTour = 0;
    }

    increaseTurn()
    {this._nbTour = this._nbTour + 1;}

    /*
    get launcherPosition()
    {return this._launcherPosition;}

    set launcherPosition(launcherPosition)
    {this._launcherPosition = launcherPosition;}

    get launcherPlayer()
    {return this._launcherPlayer;}

    set launcherPlayer(launcherPlayer)
    {this._launcherPlayer = launcherPlayer;}
    */

    get turnCountDown()
    {return this._turnCountDown;}

    set turnCountDown(turnCD)
    { this._turnCountDown = turnCD;}

    decreaseTurnCountDown()
    {

        this._turnCountDown -= 1;
        if (this._turnCountDown < 0)
            this._turnCountDown = 0;
    }
}
