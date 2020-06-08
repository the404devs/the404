/*index.js is the starting point of the game code.*/

import Menu from "./menu.js";//import the menu stuff, cause we use that first
import DungeonScene from "./dungeon-scene.js";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#000",
  parent: "game-container",
  pixelArt: true,
  // scene: Menu,//we start with the menu
  scene: DungeonScene,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 }
    }
  }
};
const game = new Phaser.Game(config);