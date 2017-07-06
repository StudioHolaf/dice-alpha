var el = document.getElementById("animations-handler");

const dotRerollLineBurst = new mojs.Burst({
  parent: el,
  left: 0, top: 0,
  count:          12,
  radius:         { 50: 120 },
  children: {
    shape:        'line',
    stroke:       '#DF2540',
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

const dotRerollSwirl1 = new mojs.ShapeSwirl({
  parent: el,
  left: 0, top: 0,
  shape: 'line',
  stroke:           '#DF2540',
  strokeWidth : 10,
  duration:       'rand(600, 1000)',
  radius:         'rand(0, 50)',
  pathScale:      'rand(.5, 1)',
  swirlFrequency: 'rand(2,4)',
  swirlSize: 'rand(20,40)',
});
  
const dotRerollSwirl2 = new mojs.ShapeSwirl({
  parent: el,
  left: 0, top: 0,
  shape: 'line',
  stroke:           '#DF2540',
  strokeWidth : 10,
  duration:       'rand(600, 1000)',
  radius:         'rand(0, 50)',
  pathScale:      'rand(.5, 1)',
  swirlFrequency: 'rand(2,4)',
  swirlSize: 'rand(20,40)',
  direction: -1
});

const dotRerollSwirl3 = new mojs.ShapeSwirl({
  parent: el,
  left: 0, top: 0,
  shape: 'line',
  stroke:           '#DF2540',
  strokeWidth : 10,
  duration:       'rand(600, 1000)',
  radius:         'rand(0, 50)',
  pathScale:      'rand(.5, 1)',
  swirlFrequency: 'rand(2,4)',
  swirlSize: 'rand(20,40)',
});
  
const dotRerollSwirl4 = new mojs.ShapeSwirl({
  parent: el,
  left: 0, top: 0,
  shape: 'line',
  stroke:           '#DF2540',
  strokeWidth : 10,
  duration:       'rand(600, 1000)',
  radius:         'rand(0, 50)',
  pathScale:      'rand(.5, 1)',
  swirlFrequency: 'rand(2,4)',
  swirlSize: 'rand(20,40)',
});

const dotRerollSwirl5 = new mojs.ShapeSwirl({
  parent: el,
  left: 0, top: 0,
  shape: 'line',
  stroke:           '#DF2540',
  strokeWidth : 10,
  duration:       'rand(600, 1000)',
  radius:         'rand(0, 50)',
  pathScale:      'rand(.5, 1)',
  swirlFrequency: 'rand(2,4)',
  swirlSize: 'rand(20,40)',
});

const dotRerollSmallCircle = new mojs.Shape({
  parent: el,
  left: 0, top: 0,
  scale:      { 0: 1 },
  fill:       '#DF2540',
  opacity:    { .9 : 0 },
  radius:     60,
});

function launchDotRerollAnimation(playerX, playerY, data) {
  
  dotRerollLineBurst
    .tune({ x: playerX, y: playerY })
    .generate()
    .replay();

  dotRerollSmallCircle
    .tune({ x: playerX, y: playerY })
    .replay();
  
  var deltaX_data = (Math.random()*220) - 110;
  var deltaY_data = (Math.random()*100) - 40;
  
  dotRerollSwirl1
    .tune({ x: playerX, y: { [playerY]: playerY-150 } })
    .generate()
    .replay();
  
  dotRerollSwirl2
    .tune({ x: playerX, y: { [playerY]: playerY-150 } })
    .generate()
    .replay();
  
  dotRerollSwirl3
    .tune({ x: playerX, y: { [playerY]: playerY-150 } })
    .generate()
    .replay();
  
  dotRerollSwirl4
    .tune({ x: playerX, y: { [playerY]: playerY-150 } })
    .generate()
    .replay();
  
  dotRerollSwirl5
    .tune({ x: playerX, y: { [playerY]: playerY-150 } })
    .generate()
    .replay();

  const dotRerollData = new mojs.Shape({
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

  const dotRerollText = document.createElement('div');
  dotRerollText.classList.add( 'character' );
  dotRerollText.innerHTML = data;
  dotRerollData.el.appendChild( dotRerollText );

  var deltaX_data = (Math.random()*220) - 110;
  var deltaY_data = (Math.random()*100) - 40;

  dotRerollData.tune({ x: {[playerX]:playerX+deltaX_data}, y: {[playerY]:playerY+deltaY_data} })
      .replay();
  
};
