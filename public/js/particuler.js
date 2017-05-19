/**
 * Created by Thibaut on 07/05/2017.
 */

function launchParticles(canvasEl, positionX, positionY, numberOfParticules, particlesType, datas, callback)
{
    window.human = false;

    var canvasEl = document.querySelector(canvasEl);
    var ctx = canvasEl.getContext('2d');
    var numberOfParticules = numberOfParticules;
    var pointerX = positionX;
    var pointerY = positionY;
    var colors;
    if(particlesType == "wind")
        colors = ['#D3E9FA', '#FFFFFF', '#A3C6D3', '#EEEEEE'];
    if(particlesType == "fire")
        colors = ['#F8824A', '#C55722', '#E85D2E', '#EA6D42'];
    if(particlesType == "water")
        colors = ['#61B4F9', '#97CDFA', '#288AAA', '#2D9DC1'];
    if(particlesType == "mountain")
        colors = ['#3C975D', '#338D54', '#3F8F4E', '#48A359'];
    if(particlesType == "arcane")
        colors = ['#D3E9FA', '#F8824A', '#61B4F9', '#3C975D'];
    if (particlesType == "dotReroll")
        colors = ['#CF000F', '#E3000E', '#E22211', '#3B0102'];
    if (particlesType == "bonusReroll")
        colors = ['#53DF83', '#00D717', '#23B684', '#72F274'];
    if (particlesType == "diceDisabled")
        colors = ['#CF000F', '#E3000E', '#E22211', '#3B0102'];
    if (particlesType == "timeChange")
        colors = ['#2E8A9C', '#59BCFB', '#3897D9', '#2F79C3'];
    if (particlesType == "heal")
        colors = ['#F5F5F5', '#F8F2E2', '#FBFDF2', '#F6EFDF'];

    function setCanvasSize() {
        canvasEl.width = window.innerWidth * 2;
        canvasEl.height = window.innerHeight * 2;
        canvasEl.style.width = window.innerWidth + 'px';
        canvasEl.style.height = window.innerHeight + 'px';
        canvasEl.getContext('2d').scale(2, 2);
    }

    function setParticuleDirection(p) {
        var angle = anime.random(0, 360) * Math.PI / 180;
        var value = anime.random(50, 180);
        var radius = [-1, 1][anime.random(0, 1)] * value;
        return {
            x: p.x + radius * Math.cos(angle),
            y: p.y + radius * Math.sin(angle)
        }
    }

    function createParticule(x,y) {
        var p = {};
        p.x = x;
        p.y = y;
        p.color = colors[anime.random(0, colors.length - 1)];
        p.radius = anime.random(16, 32);
        p.endPos = setParticuleDirection(p);
        p.draw = function() {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
            ctx.shadowBlur = 50;
            ctx.shadowColor = p.color;
            ctx.fillStyle = p.color;
            ctx.globalAlpha = 0.7;
            ctx.fill();
        }
        return p;
    }

    function createData(x,y,data) {
        var p = {};
        p.x = x;
        p.y = y;
        p.color = colors[anime.random(0, colors.length - 1)];
        p.radius = anime.random(16, 32);
        p.endPos = setParticuleDirection(p);
        p.textSize = "30";
        p.alpha = 1;

        p.draw = function() {
            ctx.beginPath();
            ctx.globalAlpha = p.alpha;
            ctx.font = p.textSize+"px Arial";
            ctx.fillStyle = "#FFFFFF";
            ctx.textAlign = "center";
            ctx.shadowBlur = 0;
            ctx.shadowColor = "#FFFFFF";
            ctx.fillText(data, p.x, p.y);
            ctx.globalAlpha = 1;
        }
        return p;
    }

    function createLine(x,y) {
        var p = {};
        p.x = x;
        p.y = y;
        p.color = colors[anime.random(0, colors.length - 1)];
        p.endPos = setParticuleDirection(p);
        //ctx.moveTo(p.x, p.y);
        p.draw = function() {
            ctx.beginPath();
            ctx.lineTo(p.endPos.x, p.endPos.y);
            ctx.moveTo(p.endPos.x, p.endPos.y);
            ctx.lineWidth = 6;
            ctx.shadowBlur = 10;
            // set line color
            ctx.strokeStyle = p.color;
            ctx.stroke();
            ctx.globalAlpha = 1;
        }
        return p;
    }

    function createCircle(x,y) {
        var p = {};
        p.x = x;
        p.y = y;
        p.color = '#FFF';
        p.radius = 0.1;
        p.alpha = .5;
        p.lineWidth = 6;
        p.draw = function() {
            ctx.globalAlpha = p.alpha;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
            ctx.lineWidth = p.lineWidth;
            ctx.strokeStyle = p.color;
            ctx.stroke();
            ctx.globalAlpha = 1;
        }
        return p;
    }

    function renderParticule(anim) {
        for (var i = 0; i < anim.animatables.length; i++) {
            anim.animatables[i].target.draw();
        }
    }

    function animateParticules(x, y) {
        var circle = createCircle(x, y);
        var lines = [];
        /*for (var i = 0; i < numberOfParticules/2; i++) {
            lines.push(createLine(x, y));
        }*/
        datasText = [];
        datasText.push(createData(x, y, datas));
        var particules = [];
        for (var i = 0; i < numberOfParticules; i++) {
            particules.push(createParticule(x, y));
        }
        anime.timeline().add({
                targets: particules,
                x: function(p) { return p.endPos.x; },
                y: function(p) { return p.endPos.y; },
                radius: 0.1,
                duration: anime.random(1200, 1800),
                easing: 'easeOutExpo',
                update: renderParticule
            })
            .add({
                targets: datasText,
                x: function(p) { return p.endPos.x; },
                y: function(p) { return p.endPos.y; },
                duration: anime.random(2500, 4000),
                easing: 'easeOutExpo',
                textSize : 25,
                alpha: {
                    value: 0,
                    easing: 'linear',
                    duration: anime.random(1200, 1800),
                },
                offset: 0,
                update: renderParticule
            })
            .add({
                targets: circle,
                radius: anime.random(80, 160),
                lineWidth: 0,
                alpha: {
                    value: 0,
                    easing: 'linear',
                    duration: anime.random(600, 800),
                },
                duration: anime.random(1200, 1800),
                easing: 'easeOutExpo',
                update: renderParticule,
                offset: 0
            });
    }


    var render = anime({
        duration: "1800",
        update: function() {
                ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
            }
    });

    render.play();
    render.finished.then(function(){ctx.clearRect(0, 0, canvasEl.width, canvasEl.height); callback()});
    animateParticules(pointerX, pointerY);

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize, false);
}