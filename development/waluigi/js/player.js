/**
 * A class that wraps up our top down player logic. It creates, animates and moves a sprite in
 * response to WASD keys. Call its update method from the scene's update and call its destroy
 * method when you're done with the player.
 */
export default class Player {
  constructor(scene, x, y) {
    this.scene = scene;
    this.coins = 0;

    const anims = scene.anims;
    anims.create({
      key: "player-walk-right",
      frames: anims.generateFrameNumbers("characters", { start: 8, end: 11 }),
      frameRate: 16,
      repeat: -1
    });
    anims.create({
      key: "player-walk-left",
      frames: anims.generateFrameNumbers("characters", { start: 4, end: 7 }),
      frameRate: 16,
      repeat: -1
    });
    anims.create({
      key: "player-walk-down",
      frames: anims.generateFrameNumbers("characters", { start: 0, end: 3 }),
      frameRate: 16,
      repeat: -1
    });
    anims.create({
      key: "player-walk-up",
      frames: anims.generateFrameNumbers("characters", { start: 12, end: 15 }),
      frameRate: 16,
      repeat: -1
    });

    this.sprite = scene.physics.add
      .sprite(x, y, "characters", 0)
      .setSize(30, 30)
      .setOffset(0, 5);
    this.sprite.tint = 0xffffff

    this.sprite.anims.play("player-walk-down");

    this.keys = scene.input.keyboard.createCursorKeys();
  }

  freeze() {
    this.sprite.body.moves = false;
  }
  unfreeze() {
    this.sprite.body.moves = true;
  }

  update() {
    const keys = this.keys;
    const sprite = this.sprite;
    const speed = 300;
    const prevVelocity = sprite.body.velocity.clone();

    // Stop any previous movement from the last frame
    sprite.body.setVelocity(0);

    // Horizontal movement
    if (keys.left.isDown) {
      this.unfreeze();
      sprite.body.setVelocityX(-speed);
      // sprite.setFlipX(true);
    } else if (keys.right.isDown) {
      this.unfreeze();
      sprite.body.setVelocityX(speed);
      // sprite.setFlipX(false);
    }

    // Vertical movement
    if (keys.up.isDown) {
      this.unfreeze();
      sprite.body.setVelocityY(-speed);
    } else if (keys.down.isDown) {
      this.unfreeze();
      sprite.body.setVelocityY(speed);
    }

    // Normalize and scale the velocity so that sprite can't move faster along a diagonal
    sprite.body.velocity.normalize().scale(speed);

    // Update the animation last and give left/right/down animations precedence over up animations
    if (keys.left.isDown) {      
      sprite.anims.play("player-walk-left", true);
    } else if (keys.up.isDown) {
      sprite.anims.play("player-walk-up", true);
    } else if (keys.right.isDown) {
      sprite.anims.play("player-walk-right", true);
    } else if (keys.down.isDown) {
      sprite.anims.play("player-walk-down", true);
    } else {
      sprite.anims.stop();

      // If we were moving & now we're not, then pick a single idle frame to use
      if (prevVelocity.y < 0) sprite.setTexture("characters", 12);
      else if (prevVelocity.y > 0) sprite.setTexture("characters", 0);
      else if (prevVelocity.x < 0) sprite.setTexture("characters", 4);
      else if (prevVelocity.x > 0) sprite.setTexture("characters", 8);
      // else sprite.setTexture("characters", 0);
    }
  }

  destroy() {
    this.sprite.destroy();
  }
}
