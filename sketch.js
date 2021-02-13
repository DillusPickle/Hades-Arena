var ground, groundIMG;

var player, playerIMG, score = 0, scoreDisplay, scoreDisplayIMG;

var Furies, Knifes;

var Enemy1, Enemy2, Enemy3;

const MAXSPEED = 20;
const ACCELERATION = 0.8;

function preload(){
  groundIMG = loadImage("Ground.png");
  playerIMG = loadImage("player.png");
  Enemy1 = loadImage("Enemy1.png");
  scoreDisplayIMG = loadImage("Scoredisplay.png")
}

function setup() {

  createCanvas(1600,700);

  player = createSprite(500,250,30,64);
  player.maxSpeed = MAXSPEED;
  player.addImage(playerIMG);
  player.scale = 3;

  ground = createSprite(760,650,800,20);
  ground.addImage(groundIMG)
  ground.scale = 3.5;
  //ground.debug = true;
  ground.setCollider("rectangle",0,0,400,1)

  scoreDisplay = createSprite(150,80,1,1);
  scoreDisplay.addImage(scoreDisplayIMG);
  scoreDisplay.scale = 4;

  Furies = new Group();
  Knifes = new Group();

}

function draw() {  

  background("black");

  player.velocityY += 0.8;
  controller(player, ACCELERATION);
  if(frameCount%120===0){
    SpawnEnemies();
  }

  if (player.velocityX < 0){
    player.mirrorX(-1);
  }
  else if (player.velocityX > 0){
    player.mirrorX(1);
  }

  if (Furies.isTouching(player)){
    Furies.destroyEach();
    player.x = 800;
    player.y = 200;
    score = 0;
  }

  if (Knifes.isTouching(Furies)){
    Knifes.destroyEach();
    Furies.destroyEach();
    score += 1;
  }

  player.collide(ground, Ground);
  drawSprites();

  textSize(75);
  text(score,100,105,10);

}

function SpawnEnemies(){
  var randX = Math.round(random(50,1550));
  var randY = Math.round(random(50,400));

  var Furiae = createSprite(randX,randY,40,74);
  Furiae.addImage(Enemy1);
  Furiae.attractionPoint(10,player.x,player.y);
  Furiae.scale = 4;

  Furies.add(Furiae);
}