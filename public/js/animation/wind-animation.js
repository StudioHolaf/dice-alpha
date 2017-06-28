var el = document.getElementById("animations-handler");

const windLineBurst = new mojs.Burst({
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

class Smoke extends mojs.CustomShape {
  getShape () {
    
    //DO A RANDOM RETURN
    return '<img src="/assets/img/smoke-sprite.png" >';
  }
}
mojs.addShape( 'smoke', Smoke );

const windBurstMini = new mojs.Burst({
  parent: el,
  left: 0, top: 0,
  count:          8,
  radius:         { 0: 40 },
  opacity:0.8,
  children: {
    shape:        'smoke',
    scale:       { 6 : 0 },
    // pathScale:    'rand(.5, 1.25)',
    duration:     300,
    delay:        'rand(0, 100)',
    isForce3d:    true,
    angle:0
  }
});

const windBurstLarge = new mojs.Burst({
  parent: el,
  left: 0, top: 0,
  count:          8,
  radius:         { 20: 80 },
  opacity:0.8,
  children: {
    shape:        'smoke',
    scale:       { 7 : 0 },
    // pathScale:    'rand(.5, 1.25)',
    duration:     600,
    delay:        'rand(0, 300)',
    isForce3d:    true,
    angle:{0:-360}
  }
});

const windLargeLineBurst = new mojs.Burst({
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


const windLargeCircle = new mojs.Shape({
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

const windSmallCircle = new mojs.Shape({
  parent: el,
  left: 0, top: 0,
  scale:      { 0: 1 },
  fill:       'white',
  opacity:    { .7 : 0 },
  radius:     30,
});

const windFlashCircle = new mojs.Shape({
  parent: el,
  left: 0, top: 0,
  scale:      { 0: 1 },
  count:3,
  fill:       'white',
  opacity:    { 1 : 0 },
  radius:     80,
  duration:     450,
  delay:        'rand(0, 250)',
});

function launchWindAnimation(playerX, playerY, data) {
  
  windFlashCircle
    .tune({ x: playerX, y: playerY })
    .replay();
  
  windLineBurst
    .tune({ x: playerX, y: playerY })
    .generate()
    .replay();
  
  windBurstMini
    .tune({ x: playerX, y: playerY })
    .generate()
    .replay();
  
  windBurstLarge
    .tune({ x: playerX, y: playerY })
    .generate()
    .replay();
  
  windLargeLineBurst
    .tune({ x: playerX, y: playerY })
    .replay();
  
  windLargeCircle
    .tune({ x: playerX, y: playerY })
    .replay();
  
  windSmallCircle
    .tune({ x: playerX, y: playerY })
    .replay();

  const windData = new mojs.Shape({
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

  const windText = document.createElement('div');
  windText.classList.add( 'character' );
  windText.innerHTML = data;
  windData.el.appendChild( windText );

  var deltaX_data = (Math.random()*220) - 110;
  var deltaY_data = (Math.random()*100) - 40;

  windData.tune({ x: {[playerX]:playerX+deltaX_data}, y: {[playerY]:playerY+deltaY_data} })
      .replay();
  
}
