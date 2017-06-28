var el = document.getElementById("animations-handler");

const healLineBurst = new mojs.Burst({
  parent: el,
  left: 0, top: 0,
  duration : 1300,
  count:          12,
  radius:         { 50: 120 },
  children: {
    shape:        'line',
    stroke:       '#7DC581',
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

const healSwirl1 = new mojs.ShapeSwirl({
  parent: el,
  left: 0, top: 0,
  shape: 'cross',
  stroke:           '#7DC581',
  strokeWidth : 10,
  duration:       'rand(600, 1000)',
  radius:         'rand(0, 50)',
  pathScale:      'rand(.5, 1)',
  swirlFrequency: 'rand(2,4)',
  duration: 2000,
  swirlSize: 'rand(20,40)',
});
  
const healSwirl2 = new mojs.ShapeSwirl({
  parent: el,
  left: 0, top: 0,
  shape: 'cross',
  stroke:           '#7DC581',
  strokeWidth : 10,
  duration:       'rand(600, 1000)',
  radius:         'rand(0, 50)',
  pathScale:      'rand(.5, 1)',
  swirlFrequency: 'rand(2,4)',
  duration: 2000,
  swirlSize: 'rand(20,40)',
  direction: -1
});

const healSwirl3 = new mojs.ShapeSwirl({
  parent: el,
  left: 0, top: 0,
  shape: 'cross',
  stroke:           '#7DC581',
  strokeWidth : 10,
  duration:       'rand(600, 1000)',
  radius:         'rand(0, 50)',
  pathScale:      'rand(.5, 1)',
  swirlFrequency: 'rand(2,4)',
  duration: 2000,
  swirlSize: 'rand(20,40)',
});
  
const healSwirl4 = new mojs.ShapeSwirl({
  parent: el,
  left: 0, top: 0,
  shape: 'cross',
  stroke:           '#7DC581',
  strokeWidth : 10,
  duration:       'rand(600, 1000)',
  radius:         'rand(0, 50)',
  pathScale:      'rand(.5, 1)',
  swirlFrequency: 'rand(2,4)',
  duration: 2000,
  swirlSize: 'rand(20,40)',
});

const healSwirl5 = new mojs.ShapeSwirl({
  parent: el,
  left: 0, top: 0,
  shape: 'cross',
  stroke:           '#7DC581',
  strokeWidth : 10,
  duration:       'rand(600, 1000)',
  radius:         'rand(0, 50)',
  pathScale:      'rand(.5, 1)',
  swirlFrequency: 'rand(2,4)',
  duration: 2000,
  swirlSize: 'rand(20,40)',
});

const healSmallCircle = new mojs.Shape({
  parent: el,
  left: 0, top: 0,
  scale:      { 0: 1 },
  fill:       '#7DC581',
  opacity:    { .9 : 0 },
  radius:     60,
  duration : 1300,
});

function launchHealAnimation(playerX, playerY, data) {
  
  healLineBurst
    .tune({ x: playerX, y: playerY })
    .generate()
    .replay();

  healSmallCircle
    .tune({ x: playerX, y: playerY })
    .replay();
  
  var deltaX_data = (Math.random()*220) - 110;
  var deltaY_data = (Math.random()*100) - 40;
  
  healSwirl1
    .tune({ x: playerX-20, y: { [playerY]: playerY-150 } })
    .generate()
    .replay();
  
  healSwirl2
    .tune({ x: playerX-10, y: { [playerY]: playerY-150 } })
    .generate()
    .replay();
  
  healSwirl3
    .tune({ x: playerX, y: { [playerY]: playerY-150 } })
    .generate()
    .replay();
  
  healSwirl4
    .tune({ x: playerX+10, y: { [playerY]: playerY-150 } })
    .generate()
    .replay();
  
  healSwirl5
    .tune({ x: playerX+20, y: { [playerY]: playerY-150 } })
    .generate()
    .replay();

  const healData = new mojs.Shape({
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

  const healText = document.createElement('div');
  healText.classList.add( 'character' );
  healText.innerHTML = data;
  healData.el.appendChild( healText );

  var deltaX_data = (Math.random()*220) - 110;
  var deltaY_data = (Math.random()*100) - 40;

  healData.tune({ x: {[playerX]:playerX+deltaX_data}, y: {[playerY]:playerY+deltaY_data} })
      .replay();
  
};
