var el = document.getElementById("animations-handler");

const disableDiceLineBurst = new mojs.Burst({
  parent: el,
  left: 0, top: 0,
  count:          12,
  radius:         { 50: 120 },
  children: {
    shape:        'line',
    stroke:       '#E83A28',
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

const disableDiceSwirl1 = new mojs.ShapeSwirl({
  parent: el,
  left: 0, top: 0,
  shape: 'rect',
  stroke:           '#E83A28',
  strokeWidth : 10,
  duration:       'rand(600, 1000)',
  radius:         'rand(0, 50)',
  pathScale:      'rand(.5, 1)',
  swirlFrequency: 'rand(2,4)',
  swirlSize: 'rand(20,40)',
});
  
const disableDiceSwirl2 = new mojs.ShapeSwirl({
  parent: el,
  left: 0, top: 0,
  shape: 'rect',
  stroke:           '#E83A28',
  strokeWidth : 10,
  duration:       'rand(600, 1000)',
  radius:         'rand(0, 50)',
  pathScale:      'rand(.5, 1)',
  swirlFrequency: 'rand(2,4)',
  swirlSize: 'rand(20,40)',
  direction: -1
});

const disableDiceSwirl3 = new mojs.ShapeSwirl({
  parent: el,
  left: 0, top: 0,
  shape: 'rect',
  stroke:           '#E83A28',
  strokeWidth : 10,
  duration:       'rand(600, 1000)',
  radius:         'rand(0, 50)',
  pathScale:      'rand(.5, 1)',
  swirlFrequency: 'rand(2,4)',
  swirlSize: 'rand(20,40)',
});
  
const disableDiceSwirl4 = new mojs.ShapeSwirl({
  parent: el,
  left: 0, top: 0,
  shape: 'rect',
  stroke:           '#E83A28',
  strokeWidth : 10,
  duration:       'rand(600, 1000)',
  radius:         'rand(0, 50)',
  pathScale:      'rand(.5, 1)',
  swirlFrequency: 'rand(2,4)',
  swirlSize: 'rand(20,40)',
});

const disableDiceSwirl5 = new mojs.ShapeSwirl({
  parent: el,
  left: 0, top: 0,
  shape: 'rect',
  stroke:           '#E83A28',
  strokeWidth : 10,
  duration:       'rand(600, 1000)',
  radius:         'rand(0, 50)',
  pathScale:      'rand(.5, 1)',
  swirlFrequency: 'rand(2,4)',
  swirlSize: 'rand(20,40)',
});

const disableDiceSmallCircle = new mojs.Shape({
  parent: el,
  left: 0, top: 0,
  scale:      { 0: 1 },
  fill:       '#E83A28',
  opacity:    { .9 : 0 },
  radius:     60,
});

function launchDisableDiceAnimation(playerX, playerY, data) {

  disableDiceLineBurst
    .tune({ x: playerX, y: playerY })
    .generate()
    .replay();

  disableDiceSmallCircle
    .tune({ x: playerX, y: playerY })
    .replay();
  
  var deltaX_data = (Math.random()*220) - 110;
  var deltaY_data = (Math.random()*100) - 40;
  
  disableDiceSwirl1
    .tune({ x: playerX, y: { [playerY]: playerY-150 } })
    .generate()
    .replay();
  
  disableDiceSwirl2
    .tune({ x: playerX, y: { [playerY]: playerY-150 } })
    .generate()
    .replay();
  
  disableDiceSwirl3
    .tune({ x: playerX, y: { [playerY]: playerY-150 } })
    .generate()
    .replay();
  
  disableDiceSwirl4
    .tune({ x: playerX, y: { [playerY]: playerY-150 } })
    .generate()
    .replay();
  
  disableDiceSwirl5
    .tune({ x: playerX, y: { [playerY]: playerY-150 } })
    .generate()
    .replay();

  const disableDiceData = new mojs.Shape({
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

  const disableDiceText = document.createElement('div');
  disableDiceText.classList.add( 'character' );
  disableDiceText.innerHTML = data;
  disableDiceData.el.appendChild( disableDiceText );

  var deltaX_data = (Math.random()*220) - 110;
  var deltaY_data = (Math.random()*100) - 40;

  disableDiceData.tune({ x: {[playerX]:playerX+deltaX_data}, y: {[playerY]:playerY+deltaY_data} })
      .replay();
  
};
