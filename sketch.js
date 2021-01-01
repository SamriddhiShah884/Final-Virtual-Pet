//Create variables here
var database;
var dog;
var dogImg , happyDogImg;
var foodS, foodStock;
var timeS, timeStock;
var hour;
var milkImg;
var n;
function preload()
{
  dogImg=loadImage ("images/dogImg.png");
  happyDogImg=loadImage ("images/a.png");
  milkImg=loadImage ("images/Milk.png");
}

function setup() {
  database= firebase.database();
  console.log(database);
  createCanvas(500, 500);
  dog= createSprite (300,300, 100, 200);
  dog.addImage (dogImg );
  dog.scale=0.27;
  foodStock=database.ref('food');
  foodStock.on ("value", readStock)
  
  timeStock=database.ref('feedTime');
  timeStock.on ("value", readTime)
  
}



function draw() {
  background( rgb(46, 139, 87)) ;
  //stroke ("white");
 
//   hour = new Date().getTime();
// console.log(hour);
var date= new Date();
var hours = date.getHours();
var minutes = date.getMinutes();
var ampm = hours >= 12 ? 'pm' : 'am';
hours = hours % 12;
hours = hours ? hours : 12; // the hour '0' should be '12'
minutes = minutes < 10 ? '0'+minutes : minutes;
var strTime = hours + ':' + minutes + ' ' + ampm;
console.log(strTime);
hour=strTime;
console.log("final time:  "+hour);

  fill ("white");
text ("Press 'DOWN ARROW' to feed "+n+" and 'UP ARROW' to add food. ", 30, 50);


text ("Milk Bottles Left :- "+foodS, 30, 90);
text ("Last Feed :- "+timeS, 200, 90);

  if(keyDown(DOWN_ARROW)){
    if(foodS!=0){
      writeStock(foodS-1);
      writeTime(hour);

      dog.addImage(happyDogImg );
      console.log ("image should change");
      console.log("up key pressed");
      
      var milk=createSprite(30,320,50,50);
      milk.addImage(milkImg);
      milk.scale=0.2;
      milk.lifetime=50;
      milk.velocityX=3;
      
    }
 
  }

  if(keyDown(UP_ARROW)){
    writeStock(foodS+1);
    dog.addImage(happyDogImg );
    console.log ("image should change");
    console.log("up key pressed");
  }

  
 

  drawSprites();
  //add styles here 
}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x;
  }
  var abc= x;
  database.ref('/').update({
    food: abc
  })
}

function readTime(data){
  timeS= data.val ();
}


function writeTime(x){
  
  database.ref('/').update({
    feedTime: x
  })
}

function readStock(data){
  foodS= data.val ();
}

function savess(){
  n=document.getElementById("fname").value;
  console.log(n);
}