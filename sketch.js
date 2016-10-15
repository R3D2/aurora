/* .aurora */

/*
** Copyright by Kesson Dalef (Giovanni Muzio)
** Creative Commons: Attribution Non-Commercial license
**
** Based on Separation Example by Daniel Shiffman on Kadenze Course.
** http://shiffman.net
** http://natureofcode.com
**
** mail: kessoning@gmail.com
** web: www.kessondalef.com
*/

// release date: October 2016

// A list of vehicles

var vehicles = [];

var md;
var dim;
var col;

var cancel = false;
var canvas;

function setup() {
  canvas = createCanvas(windowWidth/2, windowHeight/2);
  smooth();

  reset();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  reset();
}

function draw() {
  for (var i = 0; i < vehicles.length; i++) {
    // Path following and separation are worked on in this function
    vehicles[i].separate(vehicles);
    // Call the generic run method (update, borders, display, etc.)
    vehicles[i].update();

    for (var j = 0; j < vehicles.length; j++) {
      if (dist(vehicles[i].position.x, vehicles[i].position.y, vehicles[j].position.x, vehicles[j].position.y) < md) {
        stroke(255, map(dist(vehicles[i].position.x, vehicles[i].position.y, vehicles[j].position.x, vehicles[j].position.y), 0, md, 10, 0));
        strokeWeight(0.5);
        line(vehicles[i].position.x, vehicles[i].position.y, vehicles[j].position.x, vehicles[j].position.y);
      }
    }
  }

  if (cancel) {
    if (vehicles.size() > 20) {
      for (var k = 0; k < 10; k++) {
        vehicles.remove(k);
      }
    } else {
      vehicles = [];
    }
  }
}

function reset() {
  vehicles = [];
  blendMode(NORMAL);
  background(0);
  var pn = int(random(50, 100));
  md = random(width/30, width/10);
  dim = random(5, width/20);
  col = random(360);
  for (var i = 0; i < pn; i++) {
    var angle = map(i, 0, pn, 0, random(TWO_PI));
    vehicles.push(new Vehicle((cos(angle)*dim)+width/2, (sin(angle)*dim)+height/2));
  }
}

function mousePressed() {
  reset();
}

function keyPressed() {
  if (key == 'S') {
    save("aurora.jpg");
  }
}