import Phaser from "phaser";

export class DropCircle {
  constructor(scene, player, duration, poolRadius = 90) {
    this.scene = scene;
    this.player = player;
    this.duration = duration;
    this.poolRadius = poolRadius;

    // Creating a visual circle to follow the player
    this.marker = scene.add.circle(
      player.x,
      player.y,
      poolRadius,
      0xffffff,
      0.3
    );
    this.marker.setStrokeStyle(2, 0xff66ff);
    this.marker.setDepth(50);

    // Timer to drop the pool after a delay
    this.timer = scene.time.delayedCall(duration, () => {
      this.spawnPool();
      this.destroy();
    });

    // Add to the scene update list
    scene.events.on("update", this.update, this);
  }

  update() {
    // Follow the player coordinates in real time
    this.marker.x = this.player.x;
    this.marker.y = this.player.y;
  }

  spawnPool() {
    // Pool is currently a static graphic (can change later if wanted)
    const pool = this.scene.add.circle(
      this.player.x,
      this.player.y,
      this.poolRadius,
      0x9933ff,
      0.5
    );
    pool.setDepth(10);

    // Damage Zone logic
    this.zone = this.scene.add
      .zone(pool.x, pool.y, this.poolRadius * 2, this.poolRadius * 2)
      .setOrigin(0.5, 0.5);
    this.scene.physics.add.existing(this.zone);
    this.zone.body.setCircle(this.poolRadius);
    this.zone.body.setAllowGravity(false);
    this.zone.body.moves = false;

    // the damage is ticking and not single hit
    let canDamage = true;

    this.collider = this.scene.physics.add.overlap(
      this.player,
      this.zone,
      () => {
        if (canDamage && this.player.damageHandler) {
          this.player.damageHandler.takeDamage(10);
          canDamage = false;
          this.scene.time.delayedCall(1000, () => (canDamage = true));
          this.player.healthBar.update();
        }
      }
    );
  }

  destroy() {
    if (this.marker) this.marker.destroy();
    this.scene.events.off("update", this.update, this);
  }
}
