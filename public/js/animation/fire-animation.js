var el = document.getElementById("animations-handler");

const fireLineBurst = new mojs.Burst({
  parent: el,
  left: 0, top: 0,
  count:          12,
  radius:         { 50: 150 },
  children: {
    shape:        'line',
    stroke:       [ 'rgba(250, 86, 41, 0.75)', 'rgba(250, 166, 41, 0.75)', 'rgba(250, 48, 41, 0.75)'],
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

class Flame extends mojs.CustomShape {
  getShape () {
    return '<img src="/assets/img/fire-sprite.png" style="width:20px;height:20px;" />';
  }
}
mojs.addShape( 'flame', Flame );

const fireBurst = new mojs.Burst({
  parent: el,
  left: 0, top: 0,
  count:          20,
  radius:         { 40: 120 },
  opacity:0.8,
  children: {
    shape:        'flame',
    scale:       { 3 : 0 },
    // pathScale:    'rand(.5, 1.25)',
    duration:     800,
    delay:        'rand(0, 250)',
    isForce3d:    true,
    angle:270
  }
});

const fireLargeLineBurst = new mojs.Burst({
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


const fireLargeCircle = new mojs.Shape({
  parent: el,
  left: 0, top: 0,
  scale:      { 0: 1 },
  fill:       'none',
  stroke:     '#FFFFFF',
  strokeWidth: 4,
  opacity:    { .8 : 0 },
  radius:     250,
  duration:   600,
});

const fireSmallCircle = new mojs.Shape({
  parent: el,
  left: 0, top: 0,
  scale:      { 0: 1 },
  fill:       'white',
  opacity:    { .5 : 0 },
  radius:     30,
});

const fireFlashCircle = new mojs.Shape({
  parent: el,
  left: 0, top: 0,
  scale:      { 0: 1 },
  count:3,
  fill:       'rgba(250, 166, 41, 0.75)',
  opacity:    { 1 : 0 },
  radius:     80,
  duration:     450,
  delay:        'rand(0, 250)',
});

function launchFireAnimation(playerX, playerY, data) {
  
  fireFlashCircle
    .tune({ x: playerX, y: playerY })
    .replay();
  
  fireLineBurst
    .tune({ x: playerX, y: playerY })
    .generate()
    .replay();
  
  fireBurst
    .tune({ x: playerX, y: playerY })
    .generate()
    .replay();
  
  fireLargeLineBurst
    .tune({ x: playerX, y: playerY })
    .replay();
  
  fireLargeCircle
    .tune({ x: playerX, y: playerY })
    .replay();
  
  fireSmallCircle
    .tune({ x: playerX, y: playerY })
    .replay();

  const fireData = new mojs.Shape({
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

  const fireText = document.createElement('div');
  fireText.classList.add( 'character' );
  fireText.innerHTML = data;
  fireData.el.appendChild( fireText );

  var deltaX_data = (Math.random()*220) - 110;
  var deltaY_data = (Math.random()*100) - 40;

  fireData.tune({ x: {[playerX]:playerX+deltaX_data}, y: {[playerY]:playerY+deltaY_data} })
      .replay();
  
};
