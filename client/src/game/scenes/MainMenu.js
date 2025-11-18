import { Scene } from "phaser";

export class MainMenu extends Scene {
  constructor() {
    super("MainMenu");
  }

  create() {
    // Center of the screen
    const { width, height } = this.cameras.main;

    // Draw the background, centered
    const bg = this.add.image(width / 2, height / 2, "background");
    bg.setOrigin(0.5);

    // Scale background to fill screen but maintain aspect ratio
    const scaleX = width / bg.width;
    const scaleY = height / bg.height;
    const scale = Math.max(scaleX, scaleY);
    bg.setScale(scale);

    // Title text
    this.add
      .text(width / 2, height / 2 - 100, "Blueberry Game", {
        fontFamily: "Arial",
        fontSize: "48px",
        color: "#ffffff",
      })
      .setOrigin(0.5);

    // Start prompt
    this.add
      .text(width / 2, height / 2 + 20, "Press SPACE to Begin", {
        fontFamily: "Arial",
        fontSize: "24px",
        color: "#bbbbbb",
      })
      .setOrigin(0.5);

    // Input listener
    this.input.keyboard.once("keydown-SPACE", () => {
      this.scene.start("BossSelect");
    });
  }
}
