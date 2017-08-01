var el = document.getElementById("animations-handler");

const arcaneLineBurst = new mojs.Burst({
  parent: el,
  left: 0, top: 0,
  count:          12,
  radius:         { 50: 150 },
  children: {
    shape:        'line',
    stroke:       [ 'rgba(250, 250, 250, 0.75)', 'rgba(200, 200, 200, 0.75)', 'rgba(145, 145, 145, 0.75)'],
    scale:        1,
    scaleX:       { 1 : 0 },
    // pathScale:    'rand(.5, 1.25)',
    degreeShift:  'rand(-90, 90)',
    radius:       'rand(20, 40)',
    // duration:     200,
    delay:        'rand(0, 150)',
    isForce3d:    true
  }
});

var arcaneShape = new mojs.Shape({
  parent: el,
  className: 'arcane-symbol',
  left: 0, top: 0,
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

const arcaneBurstFilled = new mojs.Burst({
  parent: el,
  left: 0, top: 0,
  count:          8,
  radius:         { 20: 120 },
  opacity:0.8,
  children: {
    shape:        'polygon',
    points:       'rand(3, 5)',
    scale:       { 4 : 0 },
    // pathScale:    'rand(.5, 1.25)',
    fill: ['#b5ebff', '#f8a649', '#0087ff', '#3ce077'],
    strokeWidth : 1,
    duration:     600,
    delay:        'rand(0, 300)',
    isForce3d:    true,
    angle:{0:-360}
  }
});

const arcaneBurstVoid = new mojs.Burst({
  parent: el,
  left: 0, top: 0,
  count:          8,
  radius:         { 40: 100 },
  opacity:0.8,
  children: {
    shape:        'polygon',
    points:       'rand(1, 5)',
    scale:       { 5 : 0 },
    // pathScale:    'rand(.5, 1.25)',
    stroke: ['#b5ebff', '#f8a649', '#0087ff', '#3ce077'],
    strokeWidth : 0.5,
    fill : 'none',
    duration:     600,
    delay:        'rand(0, 300)',
    isForce3d:    true,
    angle:{0:-360}
  }
});

const arcaneLargeLineBurst = new mojs.Burst({
  parent: el,
  left: 0, top: 0,
  count:          4,
  radius:         0,
  opacity: 0.4,
  angle:         45,
  radius:        { 0: 250  },
  children: {
    shape:        'line',
    stroke:       '#FFFFFF',
    scale:        0.5,
    scaleX:       { 0.5 : 0 },
    radius:       100,
    duration:     450,
    isForce3d:    true,
    easing:       'cubic.inout'
  }
});

const arcaneLargeCircleBurst = new mojs.Shape({
  parent: el,
  left: 0, top: 0,
  scale:      { 0: 1 },
  fill:       'none',
  stroke:     'white',
  strokeWidth: 4,
  opacity:    { 1 : 0 },
  radius:     250,
  duration:   600,
});

const arcaneSmallCircleBurst = new mojs.Shape({
  parent: el,
  left: 0, top: 0,
  scale:      { 0: 1 },
  fill:       'white',
  opacity:    { .7 : 0 },
  radius:     30,
});

const arcaneFlashCircleBurst = new mojs.Shape({
  parent: el,
  left: 0, top: 0,
  scale:      { 0: 1 },
  count:3,
  fill:       '#FFFFFF',
  opacity:    { 1 : 0 },
  radius:     80,
  duration:     450,
  delay:        'rand(0, 250)',
});

function launchArcaneAnimation(playerX, playerY, data) {

  arcaneFlashCircleBurst
    .tune({ x: playerX, y: playerY })
    .replay();
  
  arcaneLineBurst
    .tune({ x: playerX, y: playerY })
    .generate()
    .replay();
  
  arcaneBurstFilled
    .tune({ x: playerX, y: playerY })
    .generate()
    .replay();
  
  arcaneBurstVoid
    .tune({ x: playerX, y: playerY })
    .generate()
    .replay();
  
  arcaneLargeLineBurst
    .tune({ x: playerX, y: playerY })
    .replay();
  
  arcaneLargeCircleBurst
    .tune({ x: playerX, y: playerY })
    .replay();
  
  arcaneSmallCircleBurst
    .tune({ x: playerX, y: playerY })
    .replay();
  
  arcaneShape.tune({ x: playerX, y: playerY })
    .replay();

  const arcaneData = new mojs.Shape({
    parent: el,
    left: 0, top: 0,
    opacity: 1,
    fill:         'none',
    radius:       23,
    isShowEnd:    false,
    isForce3d:    true,
    easing: 'quad.out',
    duration: 600,
  }).then({
    opacity:0,
    easing: 'quad.out',
    duration: 1000,
    delay:1000
  })

  const arcaneText = document.createElement('div');
  arcaneText.classList.add( 'character' );
  arcaneText.innerHTML = data;
  arcaneData.el.appendChild( arcaneText );

  var deltaX_data = (Math.random()*220) - 110;
  var deltaY_data = (Math.random()*100) - 40;

  arcaneData.tune({ x: {[playerX]:playerX+deltaX_data}, y: {[playerY]:playerY+deltaY_data} })
      .replay();
  
};
