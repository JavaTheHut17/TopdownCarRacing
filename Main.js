
let Track = [];
let trackGroup;
let Trackimg;
let dirt;
let dirtimg = [];
let dirtimgarray = [];
let road;
let roadimg;
let grass;
let grassimg;
let bricks1;
let bricks2;
let bricks3;
let car1;
let car1img;
let car2img;
let car2;
const car1vel = 0.1;
let startimg;
const grassvel = 0.001;

function preload() {
  Trackimg = loadStrings("node_modules/p5/lib/track-1.txt");
  dirtimg = loadImage("node_modules/p5/lib/Dirt.png");
  roadimg = loadImage("node_modules/p5/lib/Road.png");
  grassimg = loadImage("node_modules/p5/lib/Grass.png");
  car1img = loadImage("node_modules/p5/lib/Car.png");
  car2img = loadImage("node_modules/p5/lib/Car2.png");
  startimg = loadImage("node_modules/p5/lib/Start.png");
}

function setup() {
  new Canvas(930, 930);

  //Boundry
  walls = new Group();
  walls = new Sprite(470, 15, 900, 10);
  walls.colour = "black";
  walls.collider = "static";
  walls = new Sprite(925, 470, 10, 900);
  walls.colour = "black";
  walls.collider = "static";
  walls = new Sprite(15, 470, 10, 900);
  walls.colour = "black";
  walls.collider = "static";
  walls = new Sprite(470, 925, 900, 10);
  walls.collider = "static";
  walls.colour = "black";

  //Tiles
  //Grass
  bricks1 = new Group();
  bricks1.w = 60;
  bricks1.h = 60;
  bricks1.tile = "0";
  bricks1.img = grassimg;
  bricks1.colour = "green";
  bricks1.collider = "none";
  bricks1.layer = 1;

  //Road
  bricks2 = new Group();
  bricks2.w = 60;
  bricks2.h = 60;
  bricks2.tile = "1";
  bricks2.img = roadimg;
  bricks2.colour = "brown";
  bricks2.collider = "static";
  bricks2.layer = 1;

  //Start Checkers
  bricks3 = new Group();
  bricks3.w = 60;
  bricks3.h = 60;
  bricks3.tile = "2";
  bricks3.colour = "black";
  bricks3.collider = "static";
  bricks3.img = startimg;
  bricks3.layer = 1;

  //Track group
  tilesGroup = new Tiles(Trackimg, 50, 50, bricks1.w - 30, bricks1.h);
  tilesGroup.layer = 1;

  //Car 1

  car1 = new Group();
  car1 = new Sprite(110, 585, 50, 30);
  car1.direction = -90;
  car1.overlaps(bricks2);
  car1.overlaps(bricks1);
  car1.overlaps(bricks3);
  car1.img = car1img;

  //Car 2
  car2 = new Group();
  car2 = new Sprite(170, 585, 50, 30);
  car2.direction = -90;
  car2.overlaps(bricks2);
  car2.overlaps(bricks1);
  car2.overlaps(bricks3);
  car2.img = car2img;
}

function draw() {
  background("black");

  controls1();
  controls2();

  //Bounciness
  if (car2.collides(car1)) {
    car1.bounciness = car2.speed / 4;
    car2.bounciness = car1.speed / 4;
    car1.speed += -0.01;
    car2.speed += -0.01;
  }
}

//Car 1 Controls

function controls1() {
  car1.rotation = car1.direction;

  if (kb.holding("arrowup")) {
    car1.speed += 0.02;
  }
  if (car1.speed >= 5) car1.speed = 5;

  if (kb.pressing("arrowdown") && car1.speed > 0.05) car1.speed += -0.05;
  if (car1.speed <= 0) car1.speed = 0;
  if (kb.pressing("arrowleft"))
    (car1.direction += -1.9), (car1.rotation += -1.9);
  else if (kb.holding("arrowright"))
    (car1.direction += 1.9), (car1.rotation += 1.9);

  if (car1.overlapping(bricks1) && car1.speed > 0.2) car1.speed += -0.1;
}

//Car 2 Controls

function controls2() {
  //car 2
  car2.rotation = car2.direction;

  if (kb.holding("w")) {
    car2.speed += 0.02;
  }
  if (car2.speed >= 5) car2.speed = 5;

  if (kb.pressing("s") && car2.speed > 0.05) car2.speed += -0.05;
  if (car2.speed <= 0) car2.speed = 0;
  if (kb.pressing("a")) (car2.direction += -1.9), (car2.rotation += -1.9);
  else if (kb.holding("d")) (car2.direction += 1.9), (car2.rotation += 1.9);

  if (car2.overlapping(bricks1) && car2.speed > 0.2) car2.speed += -0.1;
}
