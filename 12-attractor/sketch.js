// Benedikt Groß
// Example for matter-attractors an attractors plugin for matter.js
// https://github.com/liabru/matter-attractors

Matter.use('matter-attractors');

const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Mouse = Matter.Mouse;
const MouseConstraint = Matter.MouseConstraint;
const Composites = Matter.Composites;

let engine;
let attractor;
let boxes;

let canvas;

function setup() {
  canvas = createCanvas(800, 600);

  // create an engine
  engine = Engine.create();

  // no gravity
  engine.world.gravity.scale = 0;

  // add attractor
  attractor = Bodies.circle(400, 400, 50, {
    isStatic: true,
    plugin: {
      attractors: [
        function(bodyA, bodyB) {
          return {
            x: (bodyA.position.x - bodyB.position.x) * 1e-6,
            y: (bodyA.position.y - bodyB.position.y) * 1e-6,
          };
        }
      ]
    }
  });
  World.add(engine.world, attractor);

  // add boxes
  // xx, yy, columns, rows, columnGap, rowGap
  boxes = Composites.stack(width/2, 0, 3, 20, 3, 3, function(x, y) {
    return Bodies.rectangle(x, y, 25, 10);
  });
  World.add(engine.world, boxes);

  // setup mouse
  const mouse = Mouse.create(canvas.elt);
  const mouseParams = {
    mouse: mouse,
    constraint: { stiffness: 0.05 }
  }
  mouseConstraint = MouseConstraint.create(engine, mouseParams);
  mouseConstraint.mouse.pixelRatio = pixelDensity();
  World.add(engine.world, mouseConstraint);

  // run the engine
  Engine.run(engine);
}

function draw() {
  background(0);

  if (mouseIsPressed) {
    // smoothly move the attractor body towards the mouse
    Body.translate(attractor, {
      x: (mouseX - attractor.position.x) * 0.25,
      y: (mouseY - attractor.position.y) * 0.25
    });
  }

  stroke(128);
  strokeWeight(1);
  fill(255);
  drawBodies(boxes.bodies);
  drawVertices(attractor.vertices);
}

function drawBodies(bodies) {
  for (let i = 0; i < bodies.length; i++) {
    drawVertices(bodies[i].vertices);
  }
}

function drawVertices(vertices) {
  beginShape();
  for (let i = 0; i < vertices.length; i++) {
    vertex(vertices[i].x, vertices[i].y);
  }
  endShape(CLOSE);
}
