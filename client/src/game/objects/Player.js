import Phaser from "phaser";
import { setupDash } from "../player-mechanics/Dash.js";
import { setupMelee } from "../player-mechanics/Melee.js";
import { setupRanged } from "../player-mechanics/Ranged.js";
import { PlayerHealth } from "../UI/PlayerHealth.js";
import { setupHeal } from "../player-mechanics/Heal.js";
import { Damage } from "../player-mechanics/Damage.js";
import { PlayerAbilityIcons } from "../UI/PlayerAbilityIcons.js";

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
    this.visualBox.setDepth(21);
    this.setDepth(20);

    // Health/Damage handler
    this.damageHandler = new Damage(this, 100);

    // Visual for health bar
    this.healthBar = new PlayerHealth(scene, this);

    // UI for player abilities
    this.playerAbilityIcons = new PlayerAbilityIcons(scene, this);

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
      ranged: "F",
      heal: "Q",
      testDamage: "T",
    });

    // Handlers for all player mechanics
    this.dashHandler = setupDash(this, scene, this.keys);
    this.meleeHandler = setupMelee(this, scene);
    this.rangedHandler = setupRanged(this, scene);
    this.healHandler = setupHeal(this, scene);

    // Mouse aiming properties
    this.aimAngle = 0;
    this.aimDirection = { x: 1, y: 0 };

    // Store scene reference
    this.scene = scene;

    // This is to prevent the player from using a melee when selecting a boss
    this.inputEnabled = false; // Disable input at first
    // Inputs allowed after 300ms after player is created.
    scene.time.delayedCall(300, () => {
      this.inputEnabled = true;
    });
  }

  // Sets up camera for player
  setupCamera(zoom = 1.2) {
    this.scene.cameras.main.startFollow(this, true, 0.1, 0.1);
    this.scene.cameras.main.setZoom(zoom);
  }

  // Updates for every movement
  update() {
    if (this.scene.scene.key === "Plexus") {
      this.handleMouseAim();
      this.dashHandler(this.scene.game.loop.delta); // Updated for dash UI
      this.meleeHandler();
      this.rangedHandler(this.scene.game.loop.delta); // Updated for ranged UI
      this.handleMovement();
      this.syncVisualBox();
      this.healHandler(this.scene.game.loop.delta); // Updated for heal UI
      this.healthBar.setPosition(this.x, this.y);
      this.playerAbilityIcons.update();
      // THIS IS JUST FOR TESTING HEALING AND DAMAGE
      if (Phaser.Input.Keyboard.JustDown(this.keys.testDamage)) {
        this.damageHandler.takeDamage(20);
        this.healthBar.update();
      }
    }
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

  // Handles where the player is aiming based off mouse movements
  handleMouseAim() {
    const pointer = this.scene.input.activePointer;

    this.aimAngle = Phaser.Math.Angle.Between(
      this.x,
      this.y,
      pointer.worldX,
      pointer.worldY
    );

    // Convert angle to normalized direction vector (Had help from stack overflow on this one)
    this.aimDirection.x = Math.cos(this.aimAngle);
    this.aimDirection.y = Math.sin(this.aimAngle);
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
