import Phaser from "phaser";

export class KillSweep {
  constructor(
    scene,
    boss,
    direction = "left-to-right",
    speed = 300,
    thickness = 20
  ) {
    this.scene = scene;

    const worldWidth = 4000;

    const sweepY = boss.y;

    // Start X based on direction
    let startX = direction === "left-to-right" ? boss.x - 300 : boss.x + 300;

    this.line = scene.add.rectangle(
      startX,
      sweepY,
      thickness,
      500,
      0xff3300,
      0.4
    );
    this.line.setDepth(60);

    // Physics zone
    this.zone = scene.add.zone(startX, sweepY, thickness, 500);
    scene.physics.add.existing(this.zone);
    this.zone.body.setAllowGravity(false);

    // Enable physics body for the line
    this.scene.physics.world.enable(this.line);
    this.line.body.setAllowGravity(false);

    // Kill the player on contact
    this.collider = scene.physics.add.overlap(scene.player, this.zone, () => {
      scene.scene.start("GameOver");
    });

    // Moving the kill line
    const velocity = direction === "left-to-right" ? speed : -speed;
    this.line.body.setVelocityX(velocity);
    this.zone.body.setVelocityX(velocity);

    // Cleanup once off-screen
    this.checkInterval = scene.time.addEvent({
      delay: 100,
      loop: true,
      callback: () => {
        if (this.line.x < -200 || this.line.x > worldWidth + 200) {
          this.destroy();
        }
      },
    });
  }

  update() {
    // keep zone aligned with visual line
    this.zone.x = this.line.x;
    this.zone.y = this.line.y;

    this.zone.body.x = this.line.body.x;
    this.zone.body.y = this.line.body.y;
  }

  destroy() {
    if (this.checkInterval) this.checkInterval.remove();
    if (this.collider) this.collider.destroy();
    this.line.destroy();
    this.zone.destroy();
  }
}
