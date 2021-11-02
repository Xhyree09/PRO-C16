var PLAY=1;
var END=0;
var gameState=1;

var knifee,fruit ,monster,fruitGroup,monsterGroup, score,r,randomFruit, position, scene;
var knifeeImage , fruit1, fruit2 ,fruit3,fruit4, monsterImage, gameOverImage, kitchenImage;
var gameOverSound ,knifeSwoosh;

function preload(){
  
  kitchenImage = loadImage("Kitchen.PNG");
  knifeeImage = loadImage("knifee.png");
  monsterImage = loadAnimation("alien1.png","alien2.png")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png")
  
  gameOverSound = loadSound("gameover.mp3")
  knifeSwooshSound = loadSound("knifeSwoosh.mp3")
}



function setup() {
  createCanvas(600, 600);
  
  scene = createSprite(300,300);
  scene.addImage(kitchenImage);
  scene.scale=1.45; 
  
  knifee=createSprite(40,200,20,20);
  knifee.addImage(knifeeImage);
  knifee.scale=0.4
  knifee.setCollider("rectangle",0,0,40,40);
  score=0;
  fruitGroup=createGroup();
  monsterGroup=createGroup();
  
}

function draw() {
  background(0);

  if(gameState===PLAY){
    
    fruits();
    Monster();
    
    knifee.y=World.mouseY;
    knifee.x=World.mouseX;
    if(fruitGroup.isTouching(knifee)){
      fruitGroup.destroyEach();
      
      knifeSwooshSound.play();
      score=score+2;

    }
    else
    {

      if(monsterGroup.isTouching(knifee)){
        gameState=END;
        gameOverSound.play()
        
        fruitGroup.destroyEach();
        monsterGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        monsterGroup.setVelocityXEach(0);
        
        knifee.addImage(gameOverImage);
        knifee.scale=2;
        knifee.x=300;
        knifee.y=300;
      }
    }
  }
  
  drawSprites();
  textSize(25);
  text("Score : "+ score,250,50);
}


function Monster(){
  if(World.frameCount%200===0){
    monster=createSprite(600,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,550));
    monster.velocityX=-(8+(score/10));
    monster.setLifetime=50;
    
    monsterGroup.add(monster);
  }
}

function fruits(){
  if(World.frameCount%80===0){
    fruit=createSprite(400,200,20,20);
    fruit.x = 0    

      fruit.velocityX= (7+(score/4));

     
    fruit.scale=0.2;
     r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    
    fruit.y=Math.round(random(50,550));
   
    
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  }
}