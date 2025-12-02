// SHOULD WORK WITH EVERY BOSS

export class BossHealthBar {
  constructor(scene, boss, width = 400, height = 24) {
    this.scene = scene;
    this.boss = boss;
    this.width = width;
    this.height = height;

    this.fixedY = scene.hallwayY - scene.hallwayHeight / 2 - 40; // Adjust this for vertical placement

    // Initial position (will be updated every frame)
    const cam = scene.cameras.main;
    const x = cam.scrollX + cam.width / 2 - width / 2;
    const y = this.fixedY;
    // Border
    this.border = scene.add
      .rectangle(x - 2, y - 2, width + 4, height + 4)
      .setOrigin(0, 0)
      .setStrokeStyle(2, 0xffffff)
      .setScrollFactor(0)
      .setDepth(10000);

    // Background bar
    this.bg = scene.add
      .rectangle(x, y, width, height, 0x222222)
      .setOrigin(0, 0)
      .setScrollFactor(0)
      .setDepth(10001);

    // Health bar
    this.bar = scene.add
      .rectangle(x, y, width, height, 0xff3366)
      .setOrigin(0, 0)
      .setScrollFactor(0)
      .setDepth(10002);
  }

  update() {
    const percent = this.boss?.damageHandler?.percent() ?? 1;
    this.bar.width = this.width * percent;
  }

  destroy() {
    this.bg.destroy();
    this.bar.destroy();
    this.border.destroy();
  }
}
