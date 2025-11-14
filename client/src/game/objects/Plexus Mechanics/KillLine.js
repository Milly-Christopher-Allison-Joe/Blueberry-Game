import Phaser from "phaser";

export class KillLine {
  constructor(scene, x, y, width = 10, height = 500) {
    this.scene = scene;

    // Visible line for the laser wall
    this.line = scene.add.rectangle(x, y, width, height, 0xff0000, 0.5);
    this.line.setDepth(50);

    //Physics body for kill detection
    this.zone = scene.add.zone(x, y, width, height);
    scene.physics.add.existing(this.zone);
    this.zone.body.setAllowGravity(false);
    this.zone.body.moves = false;

    // Kill on contact
    this.collider = this.scene.physics.add.overlap(
      scene.player,
      this.zone,
      () => {
        scene.scene.start("GameOver");
      }
    );
  }

  update(boss) {
    const targetX = boss.x + 150;
    const targetY = boss.y;

    this.line.x = targetX;
    this.line.y = targetY;

    this.zone.x = targetX;
    this.zone.y = targetY;
  }

  destroy() {
    this.line.destroy();
    this.zone.destroy();

    if (this.collider) this.collider.destroy();
  }
}
