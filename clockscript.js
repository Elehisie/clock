var canvas;
var ctx;
var cx, cy, r;

var setup = function() {
  var section = document.getElementById('canvas');
  canvas = document.createElement('canvas');
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  ctx = canvas.getContext('2d');

  cx = canvas.width/2;
  cy = canvas.height/2;
  r = (canvas.height/2)-(canvas.height/10);

  section.appendChild(canvas);
}

var drawFace = function() {
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx,cy,r,0,2*Math.PI);
  ctx.stroke();

  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(cx,cy);
  
  for(i=0;i<12;i++) {
    var angle = -i*(2*Math.PI/12)+Math.PI/2;
    ctx.moveTo(cx+r*0.9*Math.cos(angle),cy+r*0.9*(-Math.sin(angle)));
    ctx.lineTo(cx+r*Math.cos(angle),cy+r*(-Math.sin(angle)));
    ctx.moveTo(cx,cy);
    ctx.moveTo(cx+r*0.9*Math.cos(angle),cy+r*0.9*(-Math.sin(angle)));
    ctx.lineTo(cx+r*Math.cos(angle),cy+r*(-Math.sin(angle)));
    ctx.stroke();
  }
}

var drawHourHand = function(hour) {
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx. moveTo(cx,cy);
  ctx.lineTo(cx+r*0.6*Math.cos(hour),cy+r*0.6*(-Math.sin(hour)));
  ctx.stroke();
}

var drawMinuteHand = function(minute) {
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx. moveTo(cx,cy);
  ctx.lineTo(cx+r*0.85*Math.cos(minute),cy+r*0.85*(-Math.sin(minute)));
  ctx.stroke();
}

var drawSecondHand = function(second) {
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx. moveTo(cx,cy);
  ctx.lineTo(cx+r*0.90*Math.cos(second),cy+r*0.90*(-Math.sin(second)));
  ctx.stroke();
}

var drawHands = function() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  
  h = h%12; //convertion for 12h clock
  
  second = -s*(2*Math.PI/60)+Math.PI/2;
  minute = -m*(2*Math.PI/60)+Math.PI/2;
  hour = -h*(2*Math.PI/12)+Math.PI/2;
  
  hourPace = m * ((Math.PI/6)/60);
  //hourPace is supposed to move the hour hand according to the pace of movement of the minute
  //hand, making the hour hand approach the next number proportionally to the minutes passed.
  drawHourHand(hour-hourPace);
  drawMinuteHand(minute);
  drawSecondHand(second);
}

var drawClock = function() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  drawFace();
  drawHands();
  window.requestAnimationFrame(drawClock);
}

setup();
window.requestAnimationFrame(drawClock);
