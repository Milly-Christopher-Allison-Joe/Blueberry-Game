import Phaser from "phaser";

export class KillSweep {
  constructor(scene, direction = "left-to-right", speed = 600, thickness = 20) {
    this.scene = scene;

    const worldWidth = 4000;
    const worldHeight = 800;

    const y = worldHeight / 2;

    // Start X based on direction
    let startX = direction === "left-to-right" ? -50 : worldWidth + 50;

    this.line = scene.add.rectangle(
      startX,
      y,
      thickness,
      worldHeight,
      0xff3300,
      0.4
    );
    this.line.setDepth(60);

    // Physics zone
    this.zone = scene.add.zone(startX, y, thickness, worldHeight);
    scene.physics.add.existing(this.zone);
    this.zone.body.setAllowGravity(false);
    this.zone.body.moves = false;

    // Kill the player on contact
    this.collider = scene.physics.add.overlap(scene.player, this.zone, () => {
      scene.scene.start("GameOver");
    });

    // Moving the kill line
    const velocity = direction === "left-to-right" ? speed : -speed;
    this.scene.physics.world.enable(this.line);
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

  destroy() {
    if (this.checkInterval) this.checkInterval.remove();
    if (this.collider) this.collider.destroy();
    this.line.destroy();
    this.zone.destroy();
  }
}
