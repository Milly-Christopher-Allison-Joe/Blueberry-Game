import Phaser from "phaser";
import { DropCircle } from "./Plexus Mechanics/DropCircle";

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

  startDropCircleMechanic(player) {
    if (this.isDropping) return;
    this.isDropping = true;

    // it takes 5 seconds until the circle drops
    new DropCircle(this.scene, player, 5000);

    // 30 second cooldown for the mechanic
    this.scene.time.delayedCall(30000, () => {
      this.isDropping = false;
    });
  }

  destroy() {
    if (this.visual) this.visual.destroy();
    super.destroy();
  }
}
