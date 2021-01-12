//
import DungeonScene from "./dungeon-scene.js";
var background;
var startBtn;
var logo;
var waluigi;


export default class Menu extends Phaser.Scene{
	constructor() {
	    super();
	}
	preload() {
		this.load.spritesheet(
	      "button",
	      "assets/spritesheets/play_sprite_sheet.png",
	      {
	        frameWidth: 228,
	        frameHeight: 100,
	        margin: 0,
	        spacing: 0
	      }
	    );
	    // this.load.spritesheet('button', 'assets/buttons/play_sprite_sheet.png', 228, 100);
	    this.load.image('background','assets/buttons/starfield.jpg');
	    this.load.image('logo','assets/logo.png');
	    this.load.image('waluigi','assets/Waluigi.png');
	}
	create() {

	    background = this.add.tileSprite(0, 0, 800, 600, 'background').setOrigin(0, 0);
	    logo = this.add.sprite(100, 0, 'logo').setOrigin(0, 0);
	    logo.setScale(0.5,0.5);
	    waluigi = this.add.sprite(0, 225, 'waluigi').setOrigin(0, 0);
	    waluigi.setScale(0.5,0.5);

	    startBtn = this.add.sprite(600, 500, 'button', 0).setInteractive();
	    startBtn.on('pointerover', function (event) { 
	    	startBtn.setFrame(1);
	    });
	    startBtn.on('pointerout', function (event) {
	    	startBtn.setFrame(0);
	    });
	    startBtn.on('pointerdown', function(event){
	    	const cam = this.cameras.main;
			cam.fade(250, 0, 0, 0);
			cam.once("camerafadeoutcomplete", () => {
				var key = "map1";
		    	var ds = new DungeonScene(key);
		    	this.scene.add(key, ds, true);
			});
	    	// background.visible =! background.visible;
		    // logo.destroy();
		    // startBtn.destroy();
		    
		    
	    }, this); // Start game on click.

	}
	
}