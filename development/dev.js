var canvas = document.getElementById("canvas1");
var context = canvas.getContext("2d");
var width = canvas.getAttribute('width');
var height = canvas.getAttribute('height');

var buttonX = [50,200,350,580];
var buttonY = [500,500,500,500];
var buttonWidth = [96,260,182,160];
var buttonHeight = [40,40,40,40];

var divName = 'divtoshow'; // div that is to follow the mouse (must be position:absolute)
var offX = 1;          // X offset from mouse position
var offY = 1;          // Y offset from mouse position

var frames = 30;
var timerId = 0;
var time = 0.0;
 
timerId = setInterval(update, 1000/frames);

var mouseX;
var mouseY;
 
canvas.addEventListener("mousemove", checkPos);

var buttonHover = false;
var btnIndex = 0;

var fadeId = 0;
canvas.addEventListener("mouseup", checkClick);

var bgImage = new Image();
var logoImage = new Image();
var playImage = new Image();
var playImageHigh = new Image();
var instructImage = new Image();
var instructImageHigh = new Image();
var settingsImage = new Image();
var settingsImageHigh = new Image();
var creditsImage = new Image();
var creditsImageHigh = new Image();
var shipImage = new Image();
var winImage = new Image();

bgImage.src = "images/title.jpg"
//shipImage.src = "images/ship.png";  
//logoImage.src = "images/logo.png";
playImage.src = "images/playbutton.png";
instructImage.src = "images/helpbutton.png";
settingsImage.src = "images/optionsbutton.png";
creditsImage.src = "images/creditsbutton.png";
playImageHigh.src = "images/playbuttonhighlight.png";
instructImageHigh.src = "images/helpbuttonhighlight.png";
settingsImageHigh.src = "images/optionsbuttonhighlight.png";
creditsImageHigh.src = "images/creditsbuttonhighlight.png";
winImage.src = "images/youwin.png";

function test(){
	if (buttonHover == true) {
			if (btnIndex == 0)
        	{
        	//context.drawImage(playImageHigh, buttonX[0], buttonY[0], 125, 55);
        	playImage.src = "images/playbuttonhighlight.png";
        	//draw();
        	//alert("");
             }
             else if (btnIndex == 1)
             {
             	instructImage.src = "images/helpbuttonhighlight.png";
             	//context.drawImage(instructImageHigh, buttonX[1], buttonY[1], 125, 55);
             }
             else if (btnIndex == 2)
             {
             	settingsImage.src = "images/optionsbuttonhighlight.png";
             	//context.drawImage(settingsImageHigh, buttonX[2], buttonY[2], 200, 65);
             }
             else if (btnIndex == 3)
             {
             	creditsImage.src = "images/creditsbuttonhighlight.png";
             	//context.drawImage(creditsImageHigh, buttonX[3], buttonY[3], 190, 60);
             }
	}
	else if (buttonHover==false)
	{
		setTimeout(function(){playImage.src = "images/playbutton.png";
        instructImage.src = "images/helpbutton.png";
        settingsImage.src = "images/optionsbutton.png";
        creditsImage.src = "images/creditsbutton.png"; },100);
		
	}
    buttonHover=false;
	draw();
}

function update(mouseEvent) {
   //clear();
   /*if(mouseEvent.pageX || mouseEvent.pageY == 0){
    mouseX = mouseEvent.pageX - this.offsetLeft;
    mouseY = mouseEvent.pageY - this.offsetTop;
}else if(mouseEvent.offsetX || mouseEvent.offsetY == 0){
    mouseX = mouseEvent.offsetX;
    mouseY = mouseEvent.offsetY;
}*/
for(i = 0; i < buttonX.length; i++){
    if(mouseX > buttonX[i] && mouseX < buttonX[i] + buttonWidth[i]){
            if(mouseY > buttonY[i] && mouseY < buttonY[i] + buttonHeight[i]){
             btnIndex = i;
             buttonHover = true;
             
             test();
             

             

            }
        }
    else{         
        buttonHover = false;

        test();
        
        
    }

}

   /*if (buttonHover == true)
   {
   	if (btnIndex == 0)
   	{
   		playImage.src = "images/playbuttonhighlight.png";
   	}
   }*/
   draw();
}

function clear(){
    context.clearRect(0, 0, width, height);
}

function draw(){
    context.drawImage(bgImage, 0, 0, 800, 500);
	context.drawImage(logoImage, 50,-10);
	context.drawImage(playImage, buttonX[0], buttonY[0]);
	context.drawImage(instructImage, buttonX[1], buttonY[1]);
	context.drawImage(settingsImage, buttonX[2], buttonY[2]);
	context.drawImage(creditsImage, buttonX[3], buttonY[3]);

	
}

function checkPos(mouseEvent){
    /*if(mouseEvent.pageX || mouseEvent.pageY == 0){
    mouseX = mouseEvent.pageX - this.offsetLeft;
    mouseY = mouseEvent.pageY - this.offsetTop;
}else if(mouseEvent.offsetX || mouseEvent.offsetY == 0){
    mouseX = mouseEvent.offsetX;
    mouseY = mouseEvent.offsetY;
}
for(i = 0; i < buttonX.length; i++){
    if(mouseX > buttonX[i] && mouseX < buttonX[i] + buttonWidth[i]){
        	if(mouseY > buttonY[i] && mouseY < buttonY[i] + buttonHeight[i]){
             btnIndex = i;
             buttonHover = true;
             
             test();
             

             

        	}
    	}
    else{         
    	buttonHover = false;

        test();
    	
    	
	}

}*/
}



function checkClick(mouseEvent){
    for(i = 0; i < buttonX.length; i++){
        if(mouseX > buttonX[i] && mouseX < buttonX[i] + buttonWidth[i]){
            if(mouseY > buttonY[i] && mouseY < buttonY[i] + buttonHeight[i]){
                fadeId = setInterval("fadeOut()", 1000/frames);
                clear();
				clearInterval(timerId);
				canvas.removeEventListener("mousemove", checkPos);
				canvas.removeEventListener("mouseup", checkClick);
                if (btnIndex==0) {
                    game();
                }
            }
        }
    }
}

function fadeOut(){
    context.fillStyle = "rgba(0,0,0, 0.2)";
    context.fillRect (0, 0, width, height);
    time += 0.1;
    if(time >= 2){
        clearInterval(fadeId);
        time = 0;
        timerId = setInterval("update()", 1000/frames);
        canvas.addEventListener("mousemove", checkPos);
        canvas.addEventListener("mouseup", checkClick);
        context.drawImage(winImage, 0, 0, 125, 55);
    }
}
  

bgImage.onload = function(){
    context.drawImage(bgImage, 0, 0, 800, 500);
};
playImage.onload = function(){
    context.drawImage(playImage, buttonX[0], buttonY[0], 125, 55);
}
instructImage.onload = function(){
    context.drawImage(instructImage, buttonX[1], buttonY[1], 125, 55);
}
settingsImage.onload = function(){
    context.drawImage(settingsImage, buttonX[2], buttonY[2], 200, 65);
}
creditsImage.onload = function(){
    context.drawImage(creditsImage, buttonX[3], buttonY[3], 190, 60);
}

/*playImage.onMouseover = function(){
    context.drawImage(creditsImage, buttonX[0], buttonY[0], 190, 60);
}*/


function game(){
    var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var player;
var cursors;

    function preload() {
        //game.load.spritesheet('wahWalkDown', 'wahWalkDown.png', 72, 94);
        //game.load.spritesheet('wahWalkR', 'wahWalkR.png', 72, 94);
        //game.load.spritesheet('wahWalkL', 'wahWalkL.png', 72, 94);
        game.load.spritesheet('wahWalk', 'wahWalk.png', 72, 94);
        //game.load.spritesheet('leftAnim', 'wahWalkL.png', 72, 94);
        //game.load.spritesheet('rightAnim', 'wahWalkR.png', 72, 94);
        game.load.image('background', 'floor.png');
    }

    function create() {

    //var wahWalkDown = game.add.sprite(300, 200, 'wahWalkDown');
    //var wahWalkR = game.add.sprite(400, 200, 'wahWalkR');
    //var wahWalkL = game.add.sprite(500, 200, 'wahWalkL');

    //  Here we add a new animation called 'walk'
    //  Because we didn't give any other parameters it's going to make an animation from all available frames in the 'wahWalkDown' sprite sheet
    //var walkD = wahWalkDown.animations.add('walk');
    //var walkR = wahWalkR.animations.add('walk');
    //var walkL = wahWalkL.animations.add('walk');

    //  And this starts the animation playing by using its key ("walk")
    //  30 is the frame rate (30fps)
    //  true means it will loop when it finishes
    //wahWalkDown.animations.play('walk', 2, true);
    //wahWalkR.animations.play('walk', 2, true);
    //wahWalkL.animations.play('walk', 2, true);
    game.add.tileSprite(0, 0, 800, 600, 'background');

    cursors = game.input.keyboard.createCursorKeys();

    player = game.add.sprite(32, 32, 'wahWalk');



    game.physics.arcade.enable(player);

    //player.body.bounce.y = 0.2;
    //player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;

    player.animations.add('walkDown', [0, 1, 2, 3], 10, true);
    player.animations.add('walkLeft', [4, 5, 6, 7], 10, true);
    player.animations.add('walkRight', [8, 9, 10, 11], 10, true);
    player.animations.add('walkUp', [12, 13, 14, 15], 10, true);
    //player.animations.play('walk');
    //player.animations.play('walk', 10, true);
}

function update() {
//alert("");
    if (cursors.down.isDown)
    {
        player.animations.play('walkDown', 10, true);
        player.body.velocity.y=100;
        player.body.velocity.x=0;
    }
    else if (cursors.right.isDown)
    {
        player.animations.play('walkRight', 10, true);
        player.body.velocity.x=100;
        player.body.velocity.y=0;
    }
    else if (cursors.left.isDown)
    {
        player.animations.play('walkLeft', 10, true);
        player.body.velocity.x=-100;
        player.body.velocity.y=0;
    }
    else if (cursors.up.isDown)
    {
        player.animations.play('walkUp', 10, true);
        player.body.velocity.y=-100;
        player.body.velocity.x=0;
    }
    else
    {
        player.body.velocity.x=0;
        player.body.velocity.y=0;
        player.animations.stop();
        player.frame = 0;
    }
}
}

function update() {
    if (cursors.down.isDown)
    {
        
    }
    else if (cursors.right.isDown)
    {
        //tank.angle += 4;
    }

    if (cursors.up.isDown)
    {
        //  The speed we'll travel at
        currentSpeed = 300;
    }
}
}