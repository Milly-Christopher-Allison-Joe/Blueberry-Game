import Phaser from "phaser";
import { DropCircle } from "./Plexus Mechanics/DropCircle";
import { SoakCircle } from "./Plexus Mechanics/Soak";
import { KillSweep } from "./Plexus Mechanics/KillSweep";
import { BossDamage } from "./Plexus Mechanics/Damage";

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

    // Health/Damage handler
    this.damageHandler = new BossDamage(this, 2000);

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

    // it takes 3 seconds until the circle drops
    new DropCircle(this.scene, player, 3000);

    // 3 second cooldown for the mechanic
    this.scene.time.delayedCall(0, () => {
      this.isDropping = false;
    });
  }

  startSoakMechanic(player) {
    if (this.isSoaking) return;
    this.isSoaking = true;

    new SoakCircle(this.scene, this, player, 5000);

    // Cooldown before next soak allowed
    this.scene.time.delayedCall(0, () => {
      this.isSoaking = false;
    });
  }

  startKillSweep() {
    if (this.isSweeping) return;
    this.isSweeping = true;

    new KillSweep(this.scene, this, "right-to-left", 300, 20);

    //Cooldown before next
    this.scene.time.delayedCall(0, () => {
      this.isSweeping = false;
    });
  }

  reverseKillSweep() {
    if (this.isSweeping) return;
    this.isSweeping = true;

    new KillSweep(this.scene, this, "left-to-right", 300, 20);

    //Cooldown before next
    this.scene.time.delayedCall(0, () => {
      this.isSweeping = false;
    });
  }

  moveTo(x, y, duration = 2000) {
    return this.scene.tweens.add({
      targets: [this, this.visual],
      x: x,
      y: y,
      duration: duration,
      ease: "Power2",
    });
  }

  // removes boss after 0 hp. can change this to a victory screen later
  onDeath() {
    if (this.visual) this.visual.destroy();
    this.destroy();
  }

  destroy() {
    if (this.visual) this.visual.destroy();
    super.destroy();
  }
}
