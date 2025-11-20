import Phaser from "phaser";

export class BossSelect extends Phaser.Scene {
  constructor() {
    super("BossSelect");
  }

  create() {
    const { width, height } = this.scale;

    // Draw the background, centered
    const bg = this.add.image(width / 2, height / 2, "background");
    bg.setOrigin(0.5);

    // Scale background to fill screen but maintain aspect ratio
    const scaleX = width / bg.width;
    const scaleY = height / bg.height;
    const scale = Math.max(scaleX, scaleY);
    bg.setScale(scale);

    // simple title menu text
    this.add
      .text(width / 2, 100, "Choose a Boss", {
        fontFamily: '"Orbitron", sans-serif',
        fontSize: "35px",
        color: "#bbbbbb",
      })
      .setOrigin(0.5);

    // list of bosses, can be expanded
    const bosses = [
      { name: "Plexus Sentinel", sceneKey: "Plexus", id: "plexus" },
      { name: "Placeholder", sceneKey: "Placeholder", id: "placeholder" },
    ];

    bosses.forEach((boss, index) => {
      const y = 200 + index * 80;

      const bossText = this.add
        .text(width / 2, y, boss.name, {
          font: "32px Arial",
          fill: "#dddddd",
        })
        .setOrigin(0.5);

      //boss menu interactivity
      bossText.setInteractive({ useHandCursor: true });

      bossText.on("pointerover", () => bossText.setColor("#ffffff"));
      bossText.on("pointerout", () => bossText.setColor("#dddddd"));

      bossText.on("pointerdown", () => {
        // Storing the boss globally before we start fight scene
        this.registry.set("selectedBoss", boss.id);
        this.scene.start(boss.sceneKey);
      });
    });

    // Back button
    const back = this.add
      .text(width / 2, height - 80, "↩ Back", {
        font: "28px Arial",
        fill: "#aaaaaa",
      })
      .setOrigin(0.5);

    back.setInteractive({ useHandCursor: true });
    back.on("pointerover", () => back.setColor("#ffffff"));
    back.on("pointerout", () => back.setColor("#aaaaaa"));
    back.on("pointerdown", () => this.scene.start("MainMenu"));
  }
}
