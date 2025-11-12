import Phaser from "phaser";
import { setupDash } from "../player-mechanics/Dash.js";

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
      dash: "SPACE",
    });

    this.dashHandler = setupDash(this, scene, this.keys);

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
    this.dashHandler();
    this.handleMovement();
    this.syncVisualBox();
  }

  // Handles player movement based off inputs
  handleMovement() {
    // Disables normal movement during dash
    if (this.isDashing) {
      return;
    }

    // Calculate movement direction
    let moveX = 0;
    let moveY = 0;

    // Horizontal
    if (this.keys.left.isDown) {
      moveX = -1;
    }
    if (this.keys.right.isDown) {
      moveX = 1;
    }

    // Vertical
    if (this.keys.up.isDown) {
      moveY = -1;
    }
    if (this.keys.down.isDown) {
      moveY = 1;
    }

    // Normalize diagonal movement so it's not faster
    const length = Math.sqrt(moveX * moveX + moveY * moveY);
    if (length > 0) {
      moveX /= length;
      moveY /= length;
    }

    // Apply velocity with normalized direction
    this.setVelocity(
      moveX * this.speed,
      moveY * (this.speed + this.verticalSpeed) // Keep your extra vertical speed
    );
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
