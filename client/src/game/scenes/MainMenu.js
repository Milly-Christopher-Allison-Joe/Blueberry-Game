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
      .text(width / 2, height / 2 - 70, "Blueberry Game", {
        fontFamily: '"Pixelify Sans", sans-serif',
        fontWeight: 1500,
        fontSize: "90px",
        color: "#ffffff",
      })
      .setOrigin(0.5);

    // Button for starting the game
    this.add
      .sprite(width / 2, height / 2 + 130, "startButton")
      .setOrigin(0.5)
      .setScale(0.4);

    // Start prompt
    this.add
      .text(width / 2, height / 2 + 125, "Press SPACE to Begin", {
        fontFamily: '"Orbitron", sans-serif',
        fontSize: "20px",
        color: "#ffffffff",
      })
      .setOrigin(0.5);

    // Input listener
    this.input.keyboard.once("keydown-SPACE", () => {
      this.scene.start("BossSelect");
    });
  }
}
