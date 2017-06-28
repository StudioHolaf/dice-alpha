var el = document.getElementById("animations-handler");

const iceLineBurst = new mojs.Burst({
  parent: el,
  left: 0, top: 0,
  count:          8,
  radius:         { 50: 150 },
  children: {
    shape:        'line',
    stroke:       [ 'white', 'rgba(77, 204, 255, 0.57)', 'rgba(0, 146, 204, 0.6)', 'rgba(141, 204, 246, 0.73)', 'rgba(255, 255, 255, 0.73)'],
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

class IceSpike extends mojs.CustomShape {
  getShape () {
    return '<path id="XMLID_1_" class="st0" d="M8.9,33.4L0,24.5L8.9,0l8.9,24.5L8.9,33.4z"/>';
  }
}
mojs.addShape( 'iceSpike', IceSpike );

const iceSpikeBurst = new mojs.Burst({
  parent: el,
  left: 0, top: 0,
  count:          20,
  radius:         { 70: 100 },
  children: {
    shape:        'iceSpike',
    fill:       [ 'rgba(77, 204, 255, 0.57)', 'rgba(0, 146, 204, 0.6)', 'rgba(141, 204, 246, 0.73)', 'rgba(255, 255, 255, 0.73)' ],
    scale:       { 1.5 : 0 },
    // pathScale:    'rand(.5, 1.25)',
    radius:       'rand(10, 80)',
    duration:     800,
    delay:        'rand(0, 150)',
    isForce3d:    true,
    angle:90
  }
});

const iceLargeLineBurst = new mojs.Burst({
  parent: el,
  left: 0, top: 0,
  count:          4,
  radius:         0,
  opacity: 0.8,
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

const iceLargeCircle = new mojs.Shape({
  parent: el,
  left: 0, top: 0,
  scale:      { 0: 1 },
  count:2,
  fill:       'none',
  stroke:     'white',
  strokeWidth: 6,
  opacity:    { .8 : 0 },
  radius:     250,
  duration:   600,
  delay:        'rand(0, 150)',
});

const iceSmallCircle = new mojs.Shape({
  parent: el,
  left: 0, top: 0,
  scale:      { 0: 1 },
  count:2,
  fill:       'white',
  opacity:    { .5 : 0 },
  radius:     30,
});



function launchWaterAnimation(playerX, playerY, data) {

  iceLineBurst
    .tune({ x: playerX, y: playerY })
    .generate()
    .replay();

  iceSpikeBurst
    .tune({ x: playerX, y: playerY })
    .generate()
    .replay();

  iceLargeLineBurst
    .tune({ x: playerX, y: playerY })
    .replay();

  iceLargeCircle
    .tune({ x: playerX, y: playerY })
    .replay();

  iceSmallCircle
    .tune({ x: playerX, y: playerY })
    .replay();

  const iceData = new mojs.Shape({
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
  
  const iceText = document.createElement('div');
  iceText.classList.add( 'character' );
  iceText.innerHTML = data;
  iceData.el.appendChild( iceText );

  var deltaX_data = (Math.random()*220) - 110;
  var deltaY_data = (Math.random()*100) - 40;
  
  iceData.tune({ x: {[playerX]:playerX+deltaX_data}, y: {[playerY]:playerY+deltaY_data} })
      .replay();

}
