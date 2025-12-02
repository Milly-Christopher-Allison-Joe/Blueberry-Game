import Phaser from "phaser";

export class KillLine {
  constructor(scene, x, y, width = 10, height = 500) {
    this.scene = scene;

    this.scene.anims.create({
      key: "KillBeam",
      frames: scene.anims.generateFrameNumbers("KLbeam", {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    const scale = 1.5;
    const segmentHeight = 10 * scale;
    let usedHeight = 0;

    // Visible line for the laser wall
    this.line = scene.add.container(x, y);
    this.line.setDepth(50);

    while (usedHeight < height) {
      const yOffset = -height / 2 + usedHeight;
      const remaining = height - usedHeight;

      const segment = scene.add.sprite(0, yOffset, "KLbeam").setOrigin(1, 0);

      segment.rotation = -Math.PI / 2;
      segment.setScale(scale);
      segment.play("KillBeam");

      if (remaining < segmentHeight) {
        const cropHeight = remaining / scale;
        segment.setCrop(0, 0, cropHeight, 0);
      }

      this.line.add(segment);

      usedHeight += segmentHeight;
    }

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
        scene.changeScene();
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
