const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var girl,girlImg;
var butterfly,butterflyImg;
var bg,bgImg;
var invisibleGround;
var butterflyG;
var b2,b2Img;
var sound;
var cry,cryImg;
var reset,resetImg;
var gameOver,gameOverImg;
var dragonG,dragonImg;
var score = 0;

var END =0;
var PLAY =1;
var gameState = PLAY;

function preload() {

    girlImg = loadImage("girl.png");
    b2Img = loadImage("butterfly.png");
    butterflyImg = loadImage("b1.png","b2.png","b3.png");
    bgImg = loadImage("bg.png");
    sound = loadSound("garden.mp3");
    dragonImg = loadImage("dragon.png");
    gameOverImg = loadImage("gameover.png");
    resetImg = loadImage("restart.png");
    cryImg = loadImage("cry.png");
   
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;

    

    girl  = createSprite(200,380);
    girl.addImage(girlImg);
    girl.scale = 0.5;

    cry = createSprite(200,360);
    cry.addImage(cryImg);
    cry.scale = 0.5;
    cry.visible = false;

    invisibleGround = createSprite(200,390,1200,10);
    invisibleGround.visible = false;

    b2 = createSprite(300,50);
    b2.addImage(b2Img)
    b2.scale=0.5;

  gameOver = createSprite(550,100);
  gameOver.addImage(gameOverImg);

  reset = createSprite(550,140);
  reset.addImage(resetImg);
  
  gameOver.scale = 0.5;
  reset.scale = 0.5;

  gameOver.visible = false;
  reset.visible = false;

    butterflyG = new Group();
    dragonG = new Group();
}

function draw(){
    background(bgImg);
    Engine.update(engine);

 if(gameState === PLAY){

   girl.velocityY = girl.velocityY + 0.7

    if(keyDown("space") && girl.y >= 159) {
      girl.velocityY = -15;
    }

    if(butterflyG.isTouching(girl)){
       
        butterflyG.destroyEach();
        score = score +1;
    }

    

    girl.collide(invisibleGround);

 }
  if(dragonG.isTouching(girl)){

     gameState = END;

     
 }

  else if(gameState === END){
     gameOver.visible = true;
     reset.visible = true;
    // butterflyG.destroyEach();
    // dragonG.destroyEach();
     butterflyG.setVelocityXEach(0);
     butterflyG.setLifetimeEach(-1);
     dragonG.setVelocityXEach(0);
     dragonG.setLifetimeEach(-1);
     cry.visible = true;
     girl.visible = false;
     girl.velocityY = 0;
     if(mousePressedOver(reset)) {
      restart();
    }

 }

    
    
    createButterfly();
    createDragon();

     drawSprites();
     textSize(20);
     fill("black");
     text(": "+ score,350,50);

     text("TRY TO CATCH THE BUTTERFLY TO THE GIRL");
    
}
function createButterfly(){
     if (frameCount % 300 === 0){
  var butterfly = createSprite(1300,260);
 butterfly.y = Math.round(random(0,200));
 butterfly.addImage(butterflyImg);
 butterfly.scale=1;
 butterfly.velocityX = -4;
 butterfly.lifetime = -1;
 butterflyG.add(butterfly);
     }
 
}
function createDragon(){
     if (frameCount % 200 === 0){
  var dragon = createSprite(1300,260);
 dragon.y = Math.round(random(0,200));
 dragon.addImage(dragonImg);
 dragon.scale=1;
 dragon.velocityX = -4;
 dragon.lifetime = -1;
 dragonG.add(dragon);
     }
 
}
function restart (){
  
  gameOver.visible = false;
  reset.visible = false;
  
  
  gameState = PLAY;
  
  dragonG.destroyEach();
  butterflyG.destroyEach();

  girl.visible = true;
  cry.visible = false;

  score = 0;
  
}

