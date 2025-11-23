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
    const mainButton = this.add
      .sprite(width / 2, height / 2 + 130, "mainButton", {
        boxShadow: "15px 15px 15px #d19bff",
      })
      .setOrigin(0.5)
      .setScale(0.4);

    const originalY = mainButton.y;
    const originalScale = mainButton.scaleX;

    //press down to start game
    mainButton.setInteractive({ useHandCursor: true });

    // Press down effect
    mainButton.on("pointerdown", () => {
      // Scale & move down slightly for press effect-- same as boss selecct.
      mainButton.setScale(originalScale * 0.9);
      mainButton.setY(originalY + 5);
    });
    mainButton.on("pointerup", () => {
      mainButton.setScale(originalScale);
      mainButton.setY(originalY);
      this.scene.start("BossSelect");
    });
    mainButton.on("pointerout", () => {
      mainButton.setScale(originalScale);
      mainButton.setY(originalY);
    });

    // Start prompt
    this.add
      .text(width / 2, height / 2 + 125, "Start Game", {
        fontFamily: '"Orbitron", sans-serif',
        fontSize: "25px",
        color: "#ffffffff",
      })
      .setOrigin(0.5);

    // Input listener
    this.input.keyboard.once("keydown-SPACE", () => {
      this.scene.start("BossSelect");
    });
  }
}
