var data;
var balls = [];


function preload() {
    // data = loadJSON('./assets/data.json');
    data = loadJSON('./assets/pokedex.json');
    myImage = loadImage("./assets/sfondo.jpg");
    myLogo = loadImage('./assets/logo.png')
}


function setup() {
  createCanvas(windowWidth, windowHeight);

  console.log(data);
  for(var i=0; i<data.pokemon.length; i++ ) {

    // properties
    var x = random(width);
    var y = random(height);
    var candy_count = data.pokemon[i].candy_count;
    var name = data.pokemon[i].name;
    var type = data.pokemon[i].type;

    // create the ball object and add it to the array
    var myBall = new Ball(x, y, candy_count, name, type);
    balls.push(myBall);
  }
}




function draw() {

    image(myImage, 0, 0, windowWidth, windowHeight);
    imageMode(CENTER);
    image(myLogo, width/2, height/2, 250, 100);
    imageMode(CORNER);

    var myText = 'But why the hell is Magikarp this big?';
  textFont('Helvetica');
  textAlign(CENTER);
  textSize(30);
  fill('orange');
  text(myText, windowWidth/2, windowHeight/8 * 5);

  for(var j = 0; j < balls.length; j++) {
    balls[j].move();
    balls[j].display();
  }
}

function Ball(_x, _y, _diameter, _name, _type) {
    // Properties defined by constructor
    this.candy_count = _diameter;
    this.x = _x;
    this.y = _y;

    // Hardcoded properties
    this.speed = random(0.2, 1);
    this.yDir = random(1, 5);
    this.xDir = random(1, 5);

    // Methods
    this.move = function() {
        this.x += this.speed * this.xDir;
        this.y += this.speed * this.yDir;
        if (this.y >= height || this.y <= 0) {
            this.yDir *= -1;
        }
        if (this.x >= width || this.x <= 0) {
            this.xDir *= -1;
        }
    }
    this.display = function() {
    if (_type == 'Fire') {
      textSize(22);
      fill('orange');
    } else {
      fill('white');
      textSize(12);

    }
    ellipse(this.x, this.y, this.candy_count);
    noStroke();
    textAlign(CENTER);
    fill(0);
    text(_name, this.x, this.y);
    }
}
