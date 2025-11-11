import Phaser from "phaser";

export class PlexusBoss extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, null);

    // add the boss to a scene
    scene.add.existing(this);
    scene.physics.add.existing(this);

    // temp body and hitbox
    this.setSize(80, 80);
    this.setImmovable(true);
    this.setCollideWorldBounds(true);

    // visual placeholder (just a square)
    this.visual = scene.add.rectangle(x, y, 80, 80, 0xff66ff);
    this.visual.setDepth(30);

    this.scene = scene;
  }

  update() {
    // sync the visuals to the body position
    this.visual.x = this.x;
    this.visual.y = this.y;
  }

  destroy() {
    if (this.visual) this.visual.destroy();
    super.destroy();
  }
}
