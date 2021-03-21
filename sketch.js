var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var platformsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score=0;

var width1;

var cloudY;

var gameOver, restart;

var platformX

var platform1;
localStorage["HighestScore"] = 0;

function preload(){
  //"flatboy/png/idle2.png", "flatboy/png/idle3.png", "flatboy/png/idle4.png", "flatboy/png/idle5.png", "flatboy/png/idle6.png", "flatboy/png/idle7.png", "flatboy/png/idle8.png", "flatboy/png/idle9.png", "flatboy/png/idle10.png","flatboy/png/idle11.png", "flatboy/png/idle12.png", "flatboy/png/idle13.png", "flatboy/png/idle14.png", "flatboy/png/idle15.png"
  trex_running =   loadAnimation("flatboy/png/idle1.png", "flatboy/png/idle2.png", "flatboy/png/idle3.png", "flatboy/png/idle4.png", "flatboy/png/idle5.png", "flatboy/png/idle6.png", "flatboy/png/idle7.png", "flatboy/png/idle8.png", "flatboy/png/idle9.png", "flatboy/png/idle10.png","flatboy/png/idle11.png", "flatboy/png/idle12.png", "flatboy/png/idle13.png", "flatboy/png/idle14.png", "flatboy/png/idle15.png");
  trexRunning = loadAnimation("flatboy/png/Run (1).png","flatboy/png/Run (2).png","flatboy/png/Run (3).png","flatboy/png/Run (4).png","flatboy/png/Run (5).png","flatboy/png/Run (6).png","flatboy/png/Run (7).png","flatboy/png/Run (8).png","flatboy/png/Run (9).png","flatboy/png/Run (10).png","flatboy/png/Run (11).png","flatboy/png/Run (12).png","flatboy/png/Run (13).png","flatboy/png/Run (14).png","flatboy/png/Run (15).png" )
  trexJump = loadAnimation("flatboy/png/Jump (1).png","flatboy/png/Jump (2).png","flatboy/png/Jump (3).png","flatboy/png/Jump (4).png","flatboy/png/Jump (5).png","flatboy/png/Jump (6).png","flatboy/png/Jump (7).png","flatboy/png/Jump (8).png","flatboy/png/Run (9).png","flatboy/png/Jump (10).png","flatboy/png/Jump (11).png","flatboy/png/Jump (12).png","flatboy/png/Jump (13).png","flatboy/png/Jump (14).png","flatboy/png/Jump (15).png" )
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  platformImg = loadImage("platform.png")
}

function setup() {
  createCanvas(600, 400);
 
  trex = createSprite(50,170,20,50);
  platform1 = createSprite(50,200,100,10);
 
  trex.addAnimation("running",trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.addAnimation("running2",trexRunning);
  trex.addAnimation("Jumping",trexJump)
  trex.scale = 0.1;
 /* 
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  */
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  platformsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  //trex.debug = true;
  background(255);
  text("Score: "+ score, 500,50);
  width1 = random(40,80);
  cloudY = random(100,150)
  trex.collide(platform1);
  
  platform1.velocityX=-1
  platformsGroup.add(platform1);
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    //ground.velocityX = -(6 + 3*score/100);
  console.log(trex.y+28)
  
    /*if(keyDown("space") &&  platform1.y === trex.y+28) {
      trex.velocityY = -12;
    }
  */
      
    if(keyDown(RIGHT_ARROW)){
      trex.x = trex.x+3.5;
      trex.changeAnimation("running2", trexRunning)
    }
    if(keyDown(LEFT_ARROW)){
      trex.x = trex.x-3.5;
    }
    
  /*
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  */
   // trex.collide(invisibleGround);
    spawnClouds();

    if(keyDown("space")) {
      trex.changeAnimation("Jumping", trexJump)
      trex.velocityY = -12;
    }
   
    trex.velocityY = trex.velocityY + 0.8
    //spawnObstacles();
  trex.collide(platformsGroup);
    if(trex.y>200){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    //ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    platformsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided", trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    platformsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }

  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 80 === 0) {
    var platform = createSprite(600,cloudY, width1, 10);
    
     platformX = platform.x 


    platform.velocityX = -3;
    
     //assign lifetime to the variable
    platform.lifetime = 200;
    
    //adjust the depth
    platform.depth = trex.depth;
    trex.depth = trex.depth + 1;
     if(trex.isTouching(platform)){
        trex.velocityX=3;
        trex.velocityX=trex.velocityX-0.1;
      }
      platform.addImage(platformImg);
      platform.scale = 0.1
    //add each platform to the group
    platformsGroup.add(platform);
  }
  
}
/*
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
*/
function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  platformsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  trex.y=180;
  trex.x=50;
  trex.velocityX=0;
  platform.x=50;
  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
  console.log(localStorage["HighestScore"]);
  
  score = 0;
  
}