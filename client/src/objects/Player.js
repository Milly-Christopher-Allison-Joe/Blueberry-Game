import Phaser from "phaser";

// Entire player class, handles movement, inputs, and visuals
export class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, null);

    // Add to scene's display list and physics
    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Configure physics body for player PLACEHOLDER
    this.setSize(20, 20);
    this.setTint(0xffffff);
    this.setCollideWorldBounds(true);

    // Visual box representation (temporary until sprite assets are added)
    this.visualBox = scene.add.rectangle(x, y, 20, 20, 0xffffff);
    this.visualBox.setDepth(20);

    // Movement configuration
    this.speed = 200;
    this.jumpSpeed = 200;
    this.verticalSpeed = 200;

    // Basic input keys
    this.keys = scene.input.keyboard.addKeys({
      up: "W",
      down: "S",
      left: "A",
      right: "D",
    });

    // Store scene reference
    this.scene = scene;
  }

  // Sets up camera for player
  setupCamera(zoom = 1.2) {
    this.scene.cameras.main.startFollow(this, true, 0.1, 0.1);
    this.scene.cameras.main.setZoom(zoom);
  }

  // Updates for every movement
  update() {
    this.handleMovement();
    this.syncVisualBox();
  }

  // Handles player movement based off inputs
  handleMovement() {
    // Reset velocity
    this.setVelocity(0);

    // Horizontal movement
    if (this.keys.left.isDown) {
      this.setVelocityX(-this.speed);
    }
    if (this.keys.right.isDown) {
      this.setVelocityX(this.speed);
    }

    // Vertical movement
    if (this.keys.up.isDown) {
      this.setVelocityY(-this.speed - this.jumpSpeed);
    }
    if (this.keys.down.isDown) {
      this.setVelocityY(this.speed + this.verticalSpeed);
    }
  }

  // Sync for visual box position with physics
  syncVisualBox() {
    if (this.visualBox) {
      this.visualBox.x = this.x;
      this.visualBox.y = this.y;
    }
  }

  // Clean up after player is destroyed
  destroy() {
    if (this.visualBox) {
      this.visualBox.destroy();
    }
    super.destroy();
  }
}
