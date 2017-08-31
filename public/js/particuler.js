/**
 * Created by Thibaut on 07/05/2017.
 */

function launchParticles(positionX, positionY, particlesType, datas, callback)
{
    //const animLogs =  console.context('Animation');
    console.log("Launching spell : "+particlesType);

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

    if(particlesType == "wind_shield")
        launchWindShieldAnimation(positionX, positionY, datas);
    if(particlesType == "fire_shield")
        launchFireShieldAnimation(positionX, positionY, datas);
    if(particlesType == "water_shield")
        launchWaterShieldAnimation(positionX, positionY, datas);
    if(particlesType == "mountain_shield")
        launchMountainShieldAnimation(positionX, positionY, datas);
    if(particlesType == "arcane_shield")
        launchArcaneShieldAnimation(positionX, positionY, datas);

    setTimeout(function()
    {
        callback();
    },2500)

}