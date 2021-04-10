var PLAY =1;
var END = 0;
var gameState = PLAY ;

var van ,van_running , van_collided;
var ground, invisibleGround, groundImage;

var obstaclesGroup , obstacle1;

var score = 0;

var gameOver , restart;

function preload(){
  van_running = loadAnimation("van_running.png");
  van_collided = loadAnimation("van_collided.png");
  
  groundImage = loadImage("groundImage.jpg");
  
  obstacleImg = loadImage("obstacle1.png");
  
  gameOverImg = loadImage("gameOver.png");
  
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 600);
  
  van = createSprite (400,90,100,50);
  
  van.addAnimation("running", van_running);
  van.addAnimation("collided", van_collided);
  van.scale = 0.5;
  
  ground = createSprite(200,400);
  ground.addImage("ground", groundImage);
  ground.x = ground.width/2;
  ground.velocityX = -(6 + 3*score/100);
  
  gameOver = createSprite(300,300);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,200);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  
  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  obstaclesGroup = new Group();
  
  score =0;
  
}

function draw() {
  van.debug = true;
  text("Score: "+ score,500,50);
  drawSprites();
  if(gameState ===PLAY){
     score = score +1;
    ground.velocityX = -(6 +3*score/100);
    van.changeAnimation("running", van_running);
    
    if(keyDown("space") && van.y  >= 161){
       van.velocityY = -12;
       }
    
    van.velocityY = van.velocityY + 0.8;
    
    if(ground.x < 0){
       ground.x = ground.width/2;
       }
    
    van.collide(invisibleGround);
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(van)){
       gameState = END;
       }
     }
  else if(gameState === END){
          gameOver.visible = true;
          restart.visible = true;
    
    ground.velocityX = 0;
    van.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    
    van.changeImage("collided", van_collided);
    
    obstaclesGroup.setLifetimeEach(-1);
    
    if(mousePressOver(restart)){
       restart();
       }
    
  }
  
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  
  score = 0;
}

function spawnObstacles(){
  
  if(frameCount % 60 ===0){
     var obstacle1 = createSprite (600,165,10,40);
     obstacle1.addImage(obstacleImg);
    //obstacle1.debug = true;
    obstacle1.velocityX = -(6 + 3*score/100);
    
    var rand = Math.round(random(1,6));
    switch ( rand){
      case 1: obstacle1.addImage ( obstacle1);
        break;
        default: break;
    }
    
    obstacle1.scale = 0.1;
    obstacle1.lifetime = 300;
    
    obstaclesGroup.add(obstacle1);
     }
}



