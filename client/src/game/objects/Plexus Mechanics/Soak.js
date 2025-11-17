import Phaser from "phaser";

export class SoakCircle {
  constructor(scene, boss, player, duration = 5000, radius = 80) {
    this.scene = scene;
    this.boss = boss;
    this.player = player;
    this.duration = duration;
    this.radius = radius;
    this.playerInside = false;

    // Spawn position of the soak circle
    const spawnX = boss.x - 150;
    const spawnY = boss.y;

    //Visual circle for the soak zone
    this.circle = scene.add.circle(spawnX, spawnY, radius, 0x66ccff, 0.3);
    this.circle.setStrokeStyle(3, 0x99e6ff);
    this.circle.setDepth(40);

    //Invisible body for physics and overlap detection with player
    this.zone = scene.add.zone(spawnX, spawnY, radius * 2, radius * 2);
    scene.physics.add.existing(this.zone);
    this.zone.body.setAllowGravity(false);
    this.zone.body.moves = false;

    // Time for duration before the soak ends
    this.timer = scene.time.delayedCall(duration, () => this.resolve());
  }

  resolve() {
    const playerStillInside = this.scene.physics.overlap(
      this.player,
      this.zone
    );

    if (!playerStillInside) {
      //fail condition if player is not inside
      console.warn("Player failed to soak!");
      this.scene.scene.start("GameOver"); // placeholder death logic
      return;
    }
    // damage logic on successful soak
    if (this.player.damageHandler) {
      this.player.damageHandler.takeDamage(30);
      console.log("Damage taken");
    }

    // Success
    const flash = this.scene.add.circle(
      this.circle.x,
      this.circle.y,
      this.radius,
      0x00ff00,
      0.4
    );
    flash.setDepth(50);
    this.scene.tweens.add({
      targets: flash,
      alpha: { from: 0.8, to: 0 },
      scale: { from: 1, to: 2 },
      duration: 800,
      onComplete: () => flash.destroy(),
    });

    //clean up
    this.circle.destroy();
    this.zone.destroy();
  }
}
