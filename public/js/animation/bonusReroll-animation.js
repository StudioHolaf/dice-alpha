var el = document.getElementById("animations-handler");

const bonusRerollLineBurst = new mojs.Burst({
  parent: el,
  left: 0, top: 0,
  count:          12,
  radius:         { 50: 120 },
  children: {
    shape:        'line',
    stroke:       '#2397B6',
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

const bonusRerollSwirl1 = new mojs.ShapeSwirl({
  parent: el,
  left: 0, top: 0,
  shape: 'cross',
  stroke:           '#2397B6',
  strokeWidth : 10,
  duration:       'rand(600, 1000)',
  radius:         'rand(0, 50)',
  pathScale:      'rand(.5, 1)',
  swirlFrequency: 'rand(2,4)',
  swirlSize: 'rand(20,40)',
});
  
const bonusRerollSwirl2 = new mojs.ShapeSwirl({
  parent: el,
  left: 0, top: 0,
  shape: 'cross',
  stroke:           '#2397B6',
  strokeWidth : 10,
  duration:       'rand(600, 1000)',
  radius:         'rand(0, 50)',
  pathScale:      'rand(.5, 1)',
  swirlFrequency: 'rand(2,4)',
  swirlSize: 'rand(20,40)',
  direction: -1
});

const bonusRerollSwirl3 = new mojs.ShapeSwirl({
  parent: el,
  left: 0, top: 0,
  shape: 'cross',
  stroke:           '#2397B6',
  strokeWidth : 10,
  duration:       'rand(600, 1000)',
  radius:         'rand(0, 50)',
  pathScale:      'rand(.5, 1)',
  swirlFrequency: 'rand(2,4)',
  swirlSize: 'rand(20,40)',
});
  
const bonusRerollSwirl4 = new mojs.ShapeSwirl({
  parent: el,
  left: 0, top: 0,
  shape: 'cross',
  stroke:           '#2397B6',
  strokeWidth : 10,
  duration:       'rand(600, 1000)',
  radius:         'rand(0, 50)',
  pathScale:      'rand(.5, 1)',
  swirlFrequency: 'rand(2,4)',
  swirlSize: 'rand(20,40)',
});

const bonusRerollSwirl5 = new mojs.ShapeSwirl({
  parent: el,
  left: 0, top: 0,
  shape: 'cross',
  stroke:           '#2397B6',
  strokeWidth : 10,
  duration:       'rand(600, 1000)',
  radius:         'rand(0, 50)',
  pathScale:      'rand(.5, 1)',
  swirlFrequency: 'rand(2,4)',
  swirlSize: 'rand(20,40)',
});

const bonusRerollSmallCircle = new mojs.Shape({
  parent: el,
  left: 0, top: 0,
  scale:      { 0: 1 },
  fill:       '#DF2540',
  opacity:    { .9 : 0 },
  radius:     60,
});

function launchBonusRerollAnimation(playerX, playerY, data) {
  
  bonusRerollLineBurst
    .tune({ x: playerX, y: playerY })
    .generate()
    .replay();

  bonusRerollSmallCircle
    .tune({ x: playerX, y: playerY })
    .replay();
  
  var deltaX_data = (Math.random()*220) - 110;
  var deltaY_data = (Math.random()*100) - 40;
  
  bonusRerollSwirl1
    .tune({ x: playerX, y: { [playerY]: playerY-150 } })
    .generate()
    .replay();
  
  bonusRerollSwirl2
    .tune({ x: playerX, y: { [playerY]: playerY-150 } })
    .generate()
    .replay();
  
  bonusRerollSwirl3
    .tune({ x: playerX, y: { [playerY]: playerY-150 } })
    .generate()
    .replay();
  
  bonusRerollSwirl4
    .tune({ x: playerX, y: { [playerY]: playerY-150 } })
    .generate()
    .replay();
  
  bonusRerollSwirl5
    .tune({ x: playerX, y: { [playerY]: playerY-150 } })
    .generate()
    .replay();

  const bonusRerollData = new mojs.Shape({
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

  const bonusRerollText = document.createElement('div');
  bonusRerollText.classList.add( 'character' );
  bonusRerollText.innerHTML = data;
  bonusRerollData.el.appendChild( bonusRerollText );

  var deltaX_data = (Math.random()*220) - 110;
  var deltaY_data = (Math.random()*100) - 40;

  bonusRerollData.tune({ x: {[playerX]:playerX+deltaX_data}, y: {[playerY]:playerY+deltaY_data} })
      .replay();
  
};
