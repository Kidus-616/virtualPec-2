var database;
var dogImage;
var dogSprite;
var foodCount;
var button1, button2;

function setup() {
  createCanvas(600, 600);
  database = firebase.database();
  dogSprite = createSprite(200, 200, 50, 50);
  dogSprite.addImage(dogImage);
  dogSprite.scale = 0.5;

  button1 = createButton("Add Food");
  button2 = createButton("Feed Dog");

  var ref = database.ref("food");
  ref.on("value", function (data) {
    foodCount = data.val();
  });
}

function preload() {
  dogImage = loadImage("dog.png");
}

function draw() {
  background("white");
  textSize(30);
  text("FOOD REMAINING: " + foodCount, 200, 50);
  button1.mousePressed(() => {
    AddFood();
  });
  button2.mousePressed(() => {
    foodDec();
  });
  drawSprites();
}
function foodDec() {
  if (foodCount < 1) {
    foodCount = 0;
  }
  database.ref("/").update({
    food: foodCount - 1,
  });
}
function AddFood() {
  database.ref("/").update({
    food: foodCount + 1,
  });
}
