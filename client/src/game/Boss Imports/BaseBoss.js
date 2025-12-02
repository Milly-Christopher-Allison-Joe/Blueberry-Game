import Phaser from "phaser";

export class BaseBoss extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture = null) {
    super(scene, x, y, texture);

    //Register boss with scene
    this.scene = scene;
    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Default shape and physics
    this.setImmovable(true);
    this.setCollideWorldBounds(true);

    // Placeholder visual
    this.visual = null;
  }

  update() {
    // sync visual if exists
    if (this.visual) {
      this.visual.x = this.x;
      this.visual.y = this.y;
    }
  }

  onDeath() {
    // clearing phase timers instantly
    if (this.scene?.clearPhaseTimers) {
      this.scene.clearPhaseTimers();
    }

    // Change to victory screen on death
    if (this.scene?.changeScene) {
      this.scene.changeScene("victory");
    }

    // Destroy the visual
    if (this.visual) this.visual.destroy();

    // remove the boss sprite
    super.destroy();
  }

  // override destroy to also remove the visual
  destroy() {
    if (this.visual) this.visual.destroy();
    super.destroy();
  }
}
