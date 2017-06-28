/**
 * Created by Thibaut on 07/05/2017.
 */

function launchParticles(positionX, positionY, particlesType, datas, callback)
{

    if(particlesType == "wind")
        launchWindAnimation(positionX, positionY, datas);
    if(particlesType == "fire")
        launchFireAnimation(positionX, positionY, datas);
    if(particlesType == "water")
        launchWaterAnimation(positionX, positionY, datas);
    if(particlesType == "mountain")
        launchMountainAnimation(positionX, positionY, datas);
    if(particlesType == "arcane")
        launchArcaneAnimation(positionX, positionY, datas);
    if (particlesType == "dotReroll")
        launchDotRerollAnimation(positionX, positionY, datas);
    if (particlesType == "bonusReroll")
        launchBonusRerollAnimation(positionX, positionY, datas);
    if (particlesType == "diceDisabled")
        launchDisableDiceAnimation(positionX, positionY, datas);
    if (particlesType == "timeChange")
        launchDotRerollAnimation(positionX, positionY, datas);
    if (particlesType == "heal")
        launchHealAnimation(positionX, positionY, datas);

    setTimeout(function()
    {
        callback();
    },2500)

}