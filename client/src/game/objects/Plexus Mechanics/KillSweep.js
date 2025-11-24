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

    // Sprite animations for the segements of the Kill Sweep
    this.scene.anims.create({
      key: "Beam",
      frames: this.scene.anims.generateFrameNumbers("KSbeam"),
      frameRate: 7,
      repeat: -1,
    });

    this.scene.anims.create({
      key: "Start",
      frames: this.scene.anims.generateFrameNumbers("KSstart"),
      frameRate: 7,
      repeat: -1,
    });

    // Start X based on direction
    let startX = direction === "left-to-right" ? boss.x - 1500 : boss.x + 300;

    // Container for the entire Beam sprite
    this.container = scene.add.container(startX, sweepY);
    this.container.setDepth(60);

    const beamHeight = 500;
    let usedHeight = 0;

    // SCALE FACTOR
    const scale = 3;

    // TRUE sprite heights after rotation + scale
    const topHeight = 14 * scale;
    const beamSegHeight = 10 * scale;

    // start of the beam
    const topSprite = scene.add
      .sprite(0, -beamHeight / 2, "KSstart")
      .setOrigin(0.5, 0);
    topSprite.x = -6;
    topSprite.rotation = -Math.PI / 2;
    this.scene.time.delayedCall(1, () => {
      topSprite.play("Start");
    });
    topSprite.setScale(scale);
    this.container.add(topSprite);
    usedHeight += topHeight;

    // all of the segments
    while (usedHeight < beamHeight) {
      const segmentY = -beamHeight / 2 + usedHeight;

      const remaining = beamHeight - usedHeight;

      // making the final segment a flipped start segement
      if (remaining <= beamSegHeight) {
        const bottomCap = scene.add
          .sprite(0, segmentY, "KSstart")
          .setOrigin(0.5, 1);
        bottomCap.x = -6;
        bottomCap.rotation = Math.PI / 2;
        bottomCap.setScale(scale);
        this.scene.time.delayedCall(1, () => {
          bottomCap.play("Start");
        });
        this.container.add(bottomCap);
        break;
      }

      // filling the space between the start and end with the center segements
      const beamSegment = scene.add
        .sprite(0, segmentY, "KSbeam")
        .setOrigin(0.5, 0);
      beamSegment.rotation = -Math.PI / 2;
      this.scene.time.delayedCall(1, () => {
        beamSegment.play("Beam");
      });
      beamSegment.setCrop(0, 1, 16, 8);
      beamSegment.setScale(scale);
      this.container.add(beamSegment);

      usedHeight += beamSegHeight;
    }

    // Physics zone
    this.zone = scene.add.zone(startX, sweepY, thickness, 500);
    scene.physics.add.existing(this.zone);
    this.zone.body.setAllowGravity(false);

    // Enable physics body for the line
    this.scene.physics.world.enable(this.container);
    this.container.body.setAllowGravity(false);

    // Kill the player on contact
    this.collider = scene.physics.add.overlap(scene.player, this.zone, () => {
      if (scene.player.damageHandler) {
        scene.player.damageHandler.takeDamage(100);
      }
    });

    // Moving the kill line
    const velocity = direction === "left-to-right" ? speed : -speed;
    this.container.body.setVelocityX(velocity);
    this.zone.body.setVelocityX(velocity);

    // Cleanup once off-screen
    this.checkInterval = scene.time.addEvent({
      delay: 100,
      loop: true,
      callback: () => {
        if (this.container.x < -200 || this.container.x > worldWidth + 200) {
          this.destroy();
        }
      },
    });
  }

  update() {
    // keep zone aligned with visual line
    this.zone.x = this.container.x;
    this.zone.y = this.container.y;

    this.zone.body.x = this.container.body.x;
    this.zone.body.y = this.container.body.y;
  }

  destroy() {
    if (this.checkInterval) this.checkInterval.remove();
    if (this.collider) this.collider.destroy();
    this.container.destroy();
    this.zone.destroy();
  }
}
