var mario, mario_running, mario_collided;
var ground, groundImage
var bgImage,bgImg;
var brick, brickImage;
var score = 0;
var obstaclesGroup, bricksGroup,hammerGroup;
var PLAY = 1;
var END = 0;
var LEVELUP = 4;
var princess,princessGroup;
var gameState = PLAY;
 var restartImg,gameOverImg ;
var hammer,coins, donkeyKong;
var hammerImg,hammerScore=0;
var trophy,trophyImg,trophyGroup;
function preload(){
  
  mario_running = loadAnimation("mario00.png",      "mario01.png", "mario02.png", "mario03.png");
  mario_collided = loadAnimation("collided.png");
  groundImage = loadImage("ground2.png")
  bgImage = loadImage("bg.png")
  brickImage = loadImage("brick.png");
  hammerImg = loadImage("hammer1.png");
  obstacle1 = loadImage("barrel.png");
  obstacle2 = loadImage("barrel.png");
  obstacle3 = loadImage("barrel.png");
  obstacle4 = loadImage("barrel.png");
  bgImg = loadImage("bg_2.png");
   restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")
 // princessImg = loadImage("princess.jpg");
  trophyImg = loadImage("trophy.png");
}

function setup(){
  createCanvas(600,200);
  
  //create mario sprite
  mario = createSprite(50,160,20,20);
 
   mario.addAnimation("running", mario_running);
   mario.addAnimation("collided", mario_collided);
  //adding scale to mario
   mario.scale = 1.5;
   mario.x = 50;
  
   trophy=createSprite(540,100,40,10);
   trophy.addImage(trophyImg);
 trophy.scale = 0.1;
   
   
  //create ground sprite
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width/2;

   gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  
    bricksGroup = new Group();
  obstaclesGroup = new Group();
  hammerGroup = new Group();
  //princessGroup = new Group();
  //mario.debug = true;
  trophyGroup = new Group();
}

function draw(){
  // setting the background image



  if(gameState=== PLAY || gameState===END )
    {
       background(bgImage);
    }

    if(gameState=== LEVELUP )
    {
       background(bgImg);
    }

  // text to display score
  textSize(15);
  fill(50);
  text("Score:" + score ,400,15);
  
  textSize(20);
  fill(50);
  text("current game State " + gameState ,100,15);
  
  if(gameState === PLAY  || gameState === 4 )
  { 
     mario.changeAnimation("running", mario_running);
    gameOver.visible = false;
    restart.visible = false ;
    score = score + Math.round (frameCount/60);
  //giving velocity to the ground
  ground.velocityX = -5;
  //console.log(ground.x)
    
    
  
  if (ground.x<0){
    ground.x = ground.width/2;
  }
  
  //jumping the mario on space key press
  if(keyDown("space") && (mario.y>=100)) {
    mario.velocityY = -10;
  }
  
 // adding the gravity to mario
 mario.velocityY = mario.velocityY + 0.5
  
 //colliding the mario with ground

  
 // calling spawn the bricks function
  spawnBricks();
  
  // calling spawn the obstacles function
    spawnObstacles();
  console.log(" spawning hammer ");
    spawnHammer();
  

//  console.log(frameCount);
  
if(gameState===4  &&  score === 10000  )
{
  //
 // trophy=createSprite(540,300,40,10);
  //  trophy.addImage(trophyImg);
   // trophy.scale = ;
    trophy.velocityX=-1;
   trophyGroup.add(trophy);
 
}



  if(obstaclesGroup.isTouching(mario)   ||
   trophyGroup.isTouching(mario))
   {
    
  gameState = END; 
   // mario.destroy();
    }

    
    if(hammerGroup.isTouching(mario)){
      
       console.log("MARIO TOUCHES HAMMER " + hammerScore);
       clear();
       background(bgImg);
         gameState = LEVELUP;
    }
 
  }
  

  


  if( gameState === END)
    {
        gameOver.visible = true;
        restart.visible = true ;
        ground.velocityX = 0;
     
     obstaclesGroup.setVelocityXEach(0);
     bricksGroup.setVelocityXEach(0);
     hammerGroup.setVelocityXEach(0);
     
   mario.changeAnimation("collided", mario_collided);
    
    }
   mario.collide(ground);
  
   if(hammerGroup.isTouching(mario)){
      
    console.log("MARIO TOUCHES HAMMER " + hammerScore);
    clear();
    background(bgImg);
      gameState = LEVELUP;

   }
   
    if(mousePressedOver(restart)) {
      reset();
    }


 drawSprites();
  
}





function spawnBricks  (){
  //spawn the bricks
  if(frameCount % 60 === 0){
  brick = createSprite(600,100,40,10);
  brick.addImage(brickImage);
  brick.y = Math.round(random(10,60));
  brick.scale = 0.7;
  brick.velocityX = -3;
  
  //assigning lifetime
  brick.lifetime = 200;
    
  // assigning depth to bricks
  //brick.depth = mario.depth;
  //mario.depth = mario.depth+1;

   bricksGroup.add(brick);
  }
}

function spawnObstacles(){
  //spawn the obstacles
  if(frameCount % 60 === 0){
  var obstacle = createSprite(600,120,10,40);
  obstacle.velocityX = -6;
  
    
    //generate random obstacles
    var rand = Math.round(random(1,4));
    switch(rand){
        case 1: obstacle.addImage(obstacle1);
        break;
       case 2: obstacle.addImage(obstacle2);
          break;
        case 3: obstacle.addImage(obstacle3);
          break;
        case 4: obstacle.addImage(obstacle4);
          break;
      default: break;
        
     }
    
    //assign scale and lifetime to the obstacle.
    obstacle.scale = 0.2;
    obstacle.debug = true;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
    

 
  }
}

function reset(){
  gameState = PLAY;
 gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  bricksGroup.destroyEach();
  hammerGroup.destroyEach();
  score = 0;
}

function spawnHammer()
{
  if(frameCount % 900 === 0)
  {
    hammer = createSprite(540,100,40,10);
    hammer.addImage(hammerImg);
    hammer.y = Math.round(random(10,60));
    hammer.scale = 0.3;
    hammer.velocityX = -3;
    hammerGroup.add(hammer);
 
 }
}
