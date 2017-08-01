var el = document.getElementById("animations-handler");

var windShieldShape = new mojs.Shape({
    parent: el,
    left: 0, top: 0,
    className: 'windShield-symbol',
    shape:        'circle',
    scale:         { 0 : 1.1 },
    duration:      500,
    delay:0,
    fill: 'none',
    easing:        'cubic.out',
    repeat:        0,
    isForce3d:    true,
    isShowEnd : false,
    isShowStart : true,
    zIndex: -1
}).then({
    duration: 200,
    delay:1500,
    scale:0
});

function launchWindShieldAnimation(playerX, playerY, data, position) {

    windShieldShape.tune({ x: playerX, y: playerY })
        .replay();
    
};
