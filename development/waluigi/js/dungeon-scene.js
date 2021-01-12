import Player from "./player.js";
import TILES from "./tile-mapping.js";
import TilemapVisibility from "./tilemap-visibility.js";

var coins = 0;
var chestCounter = 0;

/**
 * Scene that generates a new dungeon
 */
export default class DungeonScene extends Phaser.Scene {
  constructor() {
    super();
    this.level = 0;
    this.coinGain = 0;
    this.chests = [];
    this.chestContents = [];
    this.textbox = null;
    this.popup = null;
    this.count = 0;
    this.key = false;
  }

  preload() {
    this.load.image("tiles", "assets/tilesets/buch-tileset-48px-extruded3.png");
    // this.load.image("tiles", "assets/tilesets/tileset1.png");
    this.load.spritesheet(
      "characters",
      "assets/spritesheets/Waluigi_Walk.png",
      {
        frameWidth: 29,
        frameHeight: 47,
        margin: 0,
        spacing: 0
      }
    );
  }

  create() {
  	/*The following are tile callback functions for various tile behaviors*/
  	function chestOpen(tile){      
  		const playerTileX = this.groundLayer.worldToTileX(this.player.sprite.x);
    	const playerTileY = this.groundLayer.worldToTileY(this.player.sprite.y);
    	const playerRoom = this.dungeon.getRoomAt(playerTileX, playerTileY);
    	var chestCoordinates = [playerRoom.centerX, playerRoom.centerY];
    	console.log("open chest\n"+this.chests[0]+"\n"+chestCoordinates);
    	for (var i = this.chests.length - 1; i >= 0; i--) {
    		if(this.chests[i].toString() == chestCoordinates.toString()){
          chestCounter--;
          this.popup.destroy();
          this.popup = this.add.text(0, 116, `You found ${this.chestContents[i]} coins!`, {
            font: "25px sm64",
            fill: "#ffffff",
            padding: { x: 20, y: 10 },
            backgroundColor: "#000000"
          }).setScrollFactor(0);
          this.popup.depth = 3;
          this.popup.alpha = 0.9;
          coins += this.chestContents[i];
    			this.chests.splice(i,1);
    			this.extraLayer.putTileAt(TILES.CHESTOPEN, chestCoordinates[0], chestCoordinates[1]);
    			break;
    		}
    	}
  	}

    function getKey(){
      if(!this.key){
        chestCounter--;
        const playerTileX = this.groundLayer.worldToTileX(this.player.sprite.x);
        const playerTileY = this.groundLayer.worldToTileY(this.player.sprite.y);
        const playerRoom = this.dungeon.getRoomAt(playerTileX, playerTileY);
        var chestCoordinates = [playerRoom.centerX, playerRoom.centerY];
        console.log("key");
        this.key = true;
        this.extraLayer.putTileAt(TILES.KEYCHESTOPEN, chestCoordinates[0], chestCoordinates[1]);
        this.popup.destroy();
        this.popup = this.add.text(0, 116, `You found the key!`, {
          font: "25px sm64",
          fill: "#ffffff",
          padding: { x: 20, y: 10 },
          backgroundColor: "#000000"
        }).setScrollFactor(0);
        this.popup.depth = 3;
        this.popup.alpha = 0.9;
      }
    }

    function touchKeyDoor(){
    	if (!this.key) {
    		this.player.freeze();
    		console.log("no");
    		this.popup.destroy();
    		this.popup = this.add.text(0, 116, `It's locked...\nMaybe there's a key somewhere...`, {
            font: "25px sm64",
            fill: "#ffffff",
            padding: { x: 20, y: 10 },
            backgroundColor: "#0000000"
          }).setScrollFactor(0);
          this.popup.depth = 3;
          this.popup.alpha = 0.9;
    	}
    	else{
    		console.log("yes");
    	}
    }

    /*End tile callback functions*/


    /*Initialize some variables for the dungeon.*/
    chestCounter = 1;//Start this at 1, because we're counting the one with the key as well.
    this.key = false;//Haven't got the key yet
    this.level++;//Add one to level
    this.hasPlayerReachedStairs = false;//Haven't reached the stairs. When this is true, the player is no longer updated, because it gets unloaded.

    // Generate a random world with a few extra options:
    //  - Rooms should only have odd dimensions so that they have a center tile.
    //  - Doors should be at least 2 tiles away from corners, to leave enough room for the tiles
    //    that we're going to put on either side of the door opening.
    this.dungeon = new Dungeon({
      width: 50,
      height: 50,
      doorPadding: 2,
      rooms: {
        width: { min: 7, max: 15, onlyOdd: true },
        height: { min: 7, max: 15, onlyOdd: true }
      }
    });

    // Creating a blank tilemap with dimensions matching the dungeon
    const map = this.make.tilemap({
      tileWidth: 48,
      tileHeight:48,
      width: this.dungeon.width,
      height: this.dungeon.height
    });
    /*Layer initialization here*/
    const tileset = map.addTilesetImage("tiles", null, 48, 48, 1, 2); // 1px margin, 2px spacing


    // const map = this.make.tilemap({
    //   tileWidth: 50,
    //   tileHeight: 50,
    //   width: this.dungeon.width,
    //   height: this.dungeon.height
    // });
    // /*Layer initialization here*/
    // const tileset = map.addTilesetImage("tiles", null, 50, 50, 0, 0); // 1px margin, 2px spacing
    this.groundLayer = map.createBlankDynamicLayer("Ground", tileset);
    this.stuffLayer = map.createBlankDynamicLayer("Stuff", tileset);
    this.stuffLayer.depth = 1;
    this.extraLayer = map.createBlankDynamicLayer("Extra", tileset);
    this.extraLayer.depth = 1.5;
    this.doorLayer = map.createBlankDynamicLayer("Doors", tileset);
    const shadowLayer = map.createBlankDynamicLayer("Shadow", tileset).fill(TILES.BLANK);
    shadowLayer.depth = 2;
    this.tilemapVisibility = new TilemapVisibility(shadowLayer);
    
    this.groundLayer.fill(TILES.BLANK);

    // Use the array of rooms generated to place tiles in the map
    // Note: using an arrow function here so that "this" still refers to our scene
    this.dungeon.rooms.forEach(room => {
      const { x, y, width, height, left, right, top, bottom } = room;

      // Fill the floor with mostly clean tiles
      this.groundLayer.weightedRandomize(x + 1, y + 1, width - 2, height - 2, TILES.FLOOR);

      // Place the room corners tiles
      this.groundLayer.putTileAt(TILES.WALL.TOP_LEFT, left, top);
      this.groundLayer.putTileAt(TILES.WALL.TOP_RIGHT, right, top);
      this.groundLayer.putTileAt(TILES.WALL.BOTTOM_RIGHT, right, bottom);
      this.groundLayer.putTileAt(TILES.WALL.BOTTOM_LEFT, left, bottom);

      // Fill the walls with mostly clean tiles
      this.groundLayer.weightedRandomize(left + 1, top, width - 2, 1, TILES.WALL.TOP);
      this.groundLayer.weightedRandomize(left + 1, bottom, width - 2, 1, TILES.WALL.BOTTOM);
      this.groundLayer.weightedRandomize(left, top + 1, 1, height - 2, TILES.WALL.LEFT);
      this.groundLayer.weightedRandomize(right, top + 1, 1, height - 2, TILES.WALL.RIGHT);

      // Dungeons have rooms that are connected with doors. Each door has an x & y relative to the
      // room's location. Each direction has a different door to tile mapping.
      var doors = room.getDoorLocations(); // → Returns an array of {x, y} objects
      for (var i = 0; i < doors.length; i++) {
        if (doors[i].y === 0) {
          this.groundLayer.putTilesAt(TILES.DOOR.TOP, x + doors[i].x - 1, y + doors[i].y);
        } else if (doors[i].y === room.height - 1) {
          this.groundLayer.putTilesAt(TILES.DOOR.BOTTOM, x + doors[i].x - 1, y + doors[i].y);
        } else if (doors[i].x === 0) {
          this.groundLayer.putTilesAt(TILES.DOOR.LEFT, x + doors[i].x, y + doors[i].y - 1);
        } else if (doors[i].x === room.width - 1) {
          this.groundLayer.putTilesAt(TILES.DOOR.RIGHT, x + doors[i].x, y + doors[i].y - 1);
        }
      }
    });



    // Separate out the rooms into:
    //  - The starting room (index = 0)
    //  - A random room to be designated as the end room (with stairs and nothing else)
    //  - An array of 90% of the remaining rooms, for placing random stuff (leaving 10% empty)
    const rooms = this.dungeon.rooms.slice();
    const startRoom = rooms.shift();
    const endRoom = Phaser.Utils.Array.RemoveRandomElement(rooms);
    const keyRoom = Phaser.Utils.Array.RemoveRandomElement(rooms);
    const otherRooms = Phaser.Utils.Array.Shuffle(rooms).slice(0, rooms.length * 0.9);


    /*Goal room creation*/
    this.stuffLayer.putTileAt(TILES.STAIRS, endRoom.centerX, endRoom.centerY);//Place the stairs in the center of the room
    console.log("at "+endRoom.x+",,"+endRoom.y);
    console.log(endRoom.width+",,"+endRoom.height);
    var array = endRoom.getDoorLocations();//Get the locations of all the doors in the end room
    for (var i = array.length - 1; i >= 0; i--) {//Loop through each of those doors
    	console.log(array);
    	console.log(array[i]);
    	console.log(array[i].x);

      //Here is some logic that will place 2 door tiles, one in the goal room at that door location, and another beside it in the doorway of the connecting room
    	if(array[i].x == endRoom.width-1){
    		//door on right side of room
    		this.groundLayer.putTileAt(TILES.KEYDOORRIGHT,endRoom.x + array[i].x, endRoom.y + array[i].y);
    		this.groundLayer.putTileAt(TILES.KEYDOORLEFT,endRoom.x + array[i].x+1, endRoom.y + array[i].y);
    	}
    	if(array[i].x == 0){
    		//door on left side of room
    		this.groundLayer.putTileAt(TILES.KEYDOORLEFT,endRoom.x + array[i].x, endRoom.y + array[i].y);
    		this.groundLayer.putTileAt(TILES.KEYDOORRIGHT,endRoom.x + array[i].x-1, endRoom.y + array[i].y);
    	}
    	if(array[i].y == endRoom.height-1){
    		//door on bottom side of room
    		this.groundLayer.putTileAt(TILES.KEYDOORDOWN,endRoom.x + array[i].x, endRoom.y + array[i].y);
    		this.groundLayer.putTileAt(TILES.KEYDOORUP,endRoom.x + array[i].x, endRoom.y + array[i].y+1);
    	}
    	if(array[i].y == 0){
    		//door on top side of room
    		this.groundLayer.putTileAt(TILES.KEYDOORUP,endRoom.x + array[i].x, endRoom.y + array[i].y);
    		this.groundLayer.putTileAt(TILES.KEYDOORDOWN,endRoom.x + array[i].x, endRoom.y + array[i].y-1);
    	}    	
    }

    /*Key room initialization*/
    //place the chest with the key
    this.stuffLayer.putTileAt(TILES.KEYCHEST, keyRoom.centerX, keyRoom.centerY);
    this.groundLayer.putTileAt(TILES.CHESTFRONT, keyRoom.centerX, keyRoom.centerY + 1);

    // Place stuff in the 90% "otherRooms"
    otherRooms.forEach(room => {
      var rand = Math.random();
      /*Chest rooms*/
      if (rand <= 0.25) {
        // 25% chance of chest
        var coordinates = [room.centerX,room.centerY];
        console.log(coordinates);
        this.chests.push(coordinates);
        var randCoin = Math.round(Math.random()*100);
        this.chestContents.push(randCoin);
        this.stuffLayer.putTileAt(TILES.CHEST, room.centerX, room.centerY);
        this.groundLayer.putTileAt(TILES.CHESTFRONT, room.centerX, room.centerY + 1);
        chestCounter++;
      } else if (rand <= 0.5) {
        // 50% chance of a pot anywhere in the room... except don't block a door!
        const x = Phaser.Math.Between(room.left + 2, room.right - 2);
        const y = Phaser.Math.Between(room.top + 2, room.bottom - 2);
        this.stuffLayer.weightedRandomize(x, y, 1, 1, TILES.POT);
      } else {
        // 25% of either 2 or 4 towers, depending on the room size
        if (room.height >= 9) {
          this.stuffLayer.putTilesAt(TILES.TOWER, room.centerX - 1, room.centerY + 1);
          this.stuffLayer.putTilesAt(TILES.TOWER, room.centerX + 1, room.centerY + 1);
          this.stuffLayer.putTilesAt(TILES.TOWER, room.centerX - 1, room.centerY - 2);
          this.stuffLayer.putTilesAt(TILES.TOWER, room.centerX + 1, room.centerY - 2);
        } else {
          this.stuffLayer.putTilesAt(TILES.TOWER, room.centerX - 1, room.centerY - 1);
          this.stuffLayer.putTilesAt(TILES.TOWER, room.centerX + 1, room.centerY - 1);
        }
      }
    });


    // Not exactly correct for the tileset since there are more possible floor tiles, but this will
    // do for the example.
    this.groundLayer.setCollisionByExclusion([-1, 6, 7, 8, 18, 26, 37, 45, 56, 75]);
    this.stuffLayer.setCollisionByExclusion([-1, 6, 7, 8, 37, 186]);
    this.extraLayer.setCollisionByExclusion([45]);

    this.stuffLayer.setTileIndexCallback(TILES.STAIRS, () => {
      this.stuffLayer.setTileIndexCallback(TILES.STAIRS, null);
      this.hasPlayerReachedStairs = true;
      this.player.freeze();
      const cam = this.cameras.main;
      cam.fade(250, 0, 0, 0);
      cam.once("camerafadeoutcomplete", () => {
        this.player.destroy();
        this.scene.restart();
      });
    });

    this.stuffLayer.setTileIndexCallback(TILES.CHEST, chestOpen, this);
    this.stuffLayer.setTileIndexCallback(TILES.KEYCHEST, getKey, this);
    this.groundLayer.setTileIndexCallback(TILES.KEYDOORUP, touchKeyDoor, this);
    this.groundLayer.setTileIndexCallback(TILES.KEYDOORDOWN, touchKeyDoor, this);
    this.groundLayer.setTileIndexCallback(TILES.KEYDOORLEFT, touchKeyDoor, this);
    this.groundLayer.setTileIndexCallback(TILES.KEYDOORRIGHT, touchKeyDoor, this);


    // Place the player in the first room
    const playerRoom = startRoom;
    const x = map.tileToWorldX(playerRoom.centerX);
    const y = map.tileToWorldY(playerRoom.centerY);
    this.player = new Player(this, x, y);

    // Watch the player and tilemap layers for collisions, for the duration of the scene:
    this.physics.add.collider(this.player.sprite, this.groundLayer);
    this.physics.add.collider(this.player.sprite, this.stuffLayer);
    this.physics.add.collider(this.player.sprite, this.doorLayer);

    // Phaser supports multiple cameras, but you can access the default camera like this:
    const camera = this.cameras.main;

    // Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    camera.startFollow(this.player.sprite);

    // Help text that has a "fixed" position on the screen
    this.textbox = this.add.text(16, 16, `Find the key to unlock the next level. \nCurrent level: ${this.level}\nCoins: ${coins}\nRemaining chests: ${chestCounter}`, {
        font: "25px sm64",
        fill: "#ffffff",
        padding: { x: 20, y: 10 },
        backgroundColor: "#000000"
      }).setScrollFactor(0);

    this.popup = this.add.text(0, 116, `Open chests to collect coins!`, {
        font: "25px sm64",
        fill: "#ffffff",
        padding: { x: 20, y: 10 },
        backgroundColor: "#000000"
      }).setScrollFactor(0);
    this.popup.depth = 3;
    this.popup.alpha = 0.9;
    }

  update(time, delta) {
    this.count++;//yes we need this
    this.textbox.destroy();
    this.textbox = this.add.text(0, 0, `Find the key to unlock the next level. \nCurrent level: ${this.level}\nCoins: ${coins}\nRemaining chests: ${chestCounter}`, {
        font: "25px sm64",
        fill: "#ffffff",
        padding: { x: 20, y: 10 },
        backgroundColor: "#000000",
        stroke: "#ff0000"
      }).setScrollFactor(0);
    this.textbox.depth = 3;
    this.textbox.alpha = 0.9;

    if (this.count % 200 === 0) {
      this.popup.destroy();
    }

    if (this.hasPlayerReachedStairs) return;

    this.player.update();

    // Find the player's room using another helper method from the dungeon that converts from
    // dungeon XY (in grid units) to the corresponding room instance
    const playerTileX = this.groundLayer.worldToTileX(this.player.sprite.x);
    const playerTileY = this.groundLayer.worldToTileY(this.player.sprite.y);
    const playerRoom = this.dungeon.getRoomAt(playerTileX, playerTileY);

    this.tilemapVisibility.setActiveRoom(playerRoom);
  }
}
