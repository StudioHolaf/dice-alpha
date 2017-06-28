var el = document.getElementById("animations-handler");

const mountainLineBurst = new mojs.Burst({
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

class Rock extends mojs.CustomShape {
  getShape () {
    
    //DO A RANDOM RETURN
    return '<img src="/assets/img/stone-sprite.png" />';
  }
}
mojs.addShape( 'rock', Rock );

const mountainBurstMini = new mojs.Burst({
  parent: el,
  left: 0, top: 0,
  count:          8,
  radius:         { 0: 20 },
  opacity:1,
  children: {
    shape:        'rock',
    scale:       { 3 : 0 },
    // pathScale:    'rand(.5, 1.25)',
    duration:     600,
    delay:        'rand(0, 300)',
    isForce3d:    true,
    angle:{90:180}
  }
});

const mountainBurstLarge = new mojs.Burst({
  parent: el,
  left: 0, top: 0,
  count:          8,
  radius:         { 10: 30 },
  opacity:1,
  children: {
    shape:        'rock',
    scale:       { 4 : 0 },
    // pathScale:    'rand(.5, 1.25)',
    duration:     600,
    delay:        'rand(0, 300)',
    isForce3d:    true,
    angle:90
  }
});

const mountainLargeLineBurst = new mojs.Burst({
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


const mountainLargeCircleBurst = new mojs.Shape({
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

const mountainSmallCircleBurst = new mojs.Shape({
  parent: el,
  left: 0, top: 0,
  scale:      { 0: 1 },
  fill:       'white',
  opacity:    { .7 : 0 },
  radius:     30,
});

const mountainFlashCircleBurst = new mojs.Shape({
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

function launchMountainAnimation(playerX, playerY, data) {
  
  mountainFlashCircleBurst
    .tune({ x: playerX, y: playerY })
    .replay();
  
  mountainLineBurst
    .tune({ x: playerX, y: playerY })
    .generate()
    .replay();
  
  mountainBurstMini
    .tune({ x: playerX, y: playerY })
    .generate()
    .replay();
  
  mountainBurstLarge
    .tune({ x: playerX, y: playerY })
    .generate()
    .replay();
  
  mountainLargeLineBurst
    .tune({ x: playerX, y: playerY })
    .replay();
  
  mountainLargeCircleBurst
    .tune({ x: playerX, y: playerY })
    .replay();
  
  mountainSmallCircleBurst
    .tune({ x: playerX, y: playerY })
    .replay();

  const mountainData = new mojs.Shape({
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

  const mountainText = document.createElement('div');
  mountainText.classList.add( 'character' );
  mountainText.innerHTML = data;
  mountainData.el.appendChild( mountainText );

  var deltaX_data = (Math.random()*220) - 110;
  var deltaY_data = (Math.random()*100) - 40;

  mountainData.tune({ x: {[playerX]:playerX+deltaX_data}, y: {[playerY]:playerY+deltaY_data} })
      .replay();
  
};
