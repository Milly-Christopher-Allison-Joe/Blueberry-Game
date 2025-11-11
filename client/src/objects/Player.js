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

    // Config for dash feature
    this.dashSpeed = 800;
    this.dashDuration = 250;
    this.dashCooldown = 500;
    this.isDashing = false;
    this.canDash = true;
    this.dashDirection = { x: 0, y: 0 };

    // Basic input keys
    this.keys = scene.input.keyboard.addKeys({
      up: "W",
      down: "S",
      left: "A",
      right: "D",
      dash: "SPACE",
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
    this.handleDash();
    this.handleMovement();
    this.syncVisualBox();
  }

  // Handles player movement based off inputs
  handleMovement() {
    // This makes sure normal movement is disabled during dash
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

  // Handles dash mechanic
  handleDash() {
    if (
      Phaser.Input.Keyboard.JustDown(this.keys.dash) &&
      this.canDash &&
      !this.isDashing
    ) {
      let dashX = 0;
      let dashY = 0;

      if (this.keys.left.isDown) dashX = -1;
      if (this.keys.right.isDown) dashX = 1;
      if (this.keys.up.isDown) dashY = -1;
      if (this.keys.down.isDown) dashY = 1;

      // If no direction pressed, dash right by default
      if (dashX === 0 && dashY === 0) {
        dashX = 1;
      }

      // Normalize diagonal dashes so they're not faster
      const length = Math.sqrt(dashX * dashX + dashY * dashY);
      if (length > 0) {
        dashX /= length;
        dashY /= length;
      }

      // Store dash direction
      this.dashDirection.x = dashX;
      this.dashDirection.y = dashY;

      // Start dash
      this.isDashing = true;
      this.canDash = false;

      // Apply dash velocity
      this.setVelocity(
        this.dashDirection.x * this.dashSpeed,
        this.dashDirection.y * this.dashSpeed
      );

      // End dash after duration
      this.scene.time.delayedCall(this.dashDuration, () => {
        this.isDashing = false;
        this.setAlpha(1);
        if (this.visualBox) this.visualBox.setAlpha(1);
      });

      // Reset cooldown
      this.scene.time.delayedCall(this.dashCooldown, () => {
        this.canDash = true;
      });
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
