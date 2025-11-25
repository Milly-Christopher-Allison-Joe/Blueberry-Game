import { Scene } from "phaser";
import Phaser from "phaser";

export class PauseMenu extends Scene {
  constructor() {
    super("PauseMenu");
  }

  init(data) {
    // storing the name of the scene that was paused
    this.currentScene = data.currentScene;
  }

  create() {
    // Dim the background behind the pause menu
    this.add
      .rectangle(0, 0, this.scale.width, this.scale.height, 0x000000, 0.5)
      .setOrigin(0);

    // Pause Title for the menu
    this.add
      .text(this.scale.width / 2, 200, "PAUSED", {
        fontFamily: "Science Gothic",
        fontSize: 64,
        color: "#6c24ba",
        stroke: "#ffffffff",
        strokeThickness: 8,
      })
      .setOrigin(0.5);

    // mostly copied and pasted from other pages [BossSelect.js, GameOver.js, etc.]
    const centerX = this.scale.width / 2;

    // Button sprite behind "Resume" text
    const resumeButtonSprite = this.add
      .sprite(centerX, 350, "buttonSprite")
      .setOrigin(0.5)
      .setScale(0.4)
      .setDepth(0); // Behind the text

    // Resume button text
    const resumeButton = this.add
      .text(centerX, 350, "Resume", {
        fontFamily: "Orbitron",
        fontSize: 40,
        color: "#dddddd",
      })
      .setOrigin(0.5)
      .setDepth(1); // In front of the sprite

    // Make text non-interactive - button sprite will handle interactions
    resumeButton.disableInteractive();

    // Store original positions and scale for press effect
    const resumeOriginalY = resumeButtonSprite.y;
    const resumeOriginalScale = resumeButtonSprite.scaleX;

    // Make button sprite interactive with smaller hit area
    resumeButtonSprite.setInteractive({
      useHandCursor: true,
      hitArea: new Phaser.Geom.Rectangle(-75, -25, 50, 50),
      pixelPerfect: false,
    });

    // Hover effects
    resumeButtonSprite.on("pointerover", () => {
      resumeButton.setColor("#ffffff");
    });

    // Press down effect
    resumeButtonSprite.on("pointerdown", () => {
      resumeButtonSprite.setScale(resumeOriginalScale * 0.9);
      resumeButtonSprite.setY(resumeOriginalY + 5);
      resumeButton.setY(resumeOriginalY + 5);
    });

    // Handle click
    resumeButtonSprite.on("pointerup", () => {
      resumeButtonSprite.setScale(resumeOriginalScale);
      resumeButtonSprite.setY(resumeOriginalY);
      resumeButton.setY(resumeOriginalY);
      // Closes the pause menu
      this.scene.stop();
      // resumes the boss fight
      this.scene.resume(this.currentScene);
    });

    resumeButtonSprite.on("pointerout", () => {
      resumeButtonSprite.setScale(resumeOriginalScale);
      resumeButtonSprite.setY(resumeOriginalY);
      resumeButton.setY(resumeOriginalY);
      resumeButton.setColor("#dddddd");
    });

    // Button sprite behind "Restart" text
    const restartButtonSprite = this.add
      .sprite(centerX, 530, "buttonSprite")
      .setOrigin(0.5)
      .setScale(0.4)
      .setDepth(0); // Behind the text

    // Restart the Boss Button text
    const restart = this.add
      .text(centerX, 530, "Restart", {
        fontFamily: "Orbitron",
        fontSize: 40,
        color: "#dddddd",
      })
      .setOrigin(0.5)
      .setDepth(1); // In front of the sprite

    // Make text non-interactive - button sprite will handle interactions
    restart.disableInteractive();

    // Store original positions and scale for press effect
    const restartOriginalY = restartButtonSprite.y;
    const restartOriginalScale = restartButtonSprite.scaleX;

    // Make button sprite interactive with smaller hit area
    restartButtonSprite.setInteractive({
      useHandCursor: true,
      hitArea: new Phaser.Geom.Rectangle(-60, 0, 50, 30),
      pixelPerfect: false,
    });

    // Hover effects
    restartButtonSprite.on("pointerover", () => {
      restart.setColor("#ffffff");
    });

    // Press down effect
    restartButtonSprite.on("pointerdown", () => {
      restartButtonSprite.setScale(restartOriginalScale * 0.9);
      restartButtonSprite.setY(restartOriginalY + 5);
      restart.setY(restartOriginalY + 5);
    });

    // Handle click
    restartButtonSprite.on("pointerup", () => {
      restartButtonSprite.setScale(restartOriginalScale);
      restartButtonSprite.setY(restartOriginalY);
      restart.setY(restartOriginalY);
      // Close pause menu
      this.scene.stop();
      // Stop the scene that was paused
      this.scene.stop(this.currentScene);
      // Restart that same scene
      this.scene.start(this.currentScene);
    });

    restartButtonSprite.on("pointerout", () => {
      restartButtonSprite.setScale(restartOriginalScale);
      restartButtonSprite.setY(restartOriginalY);
      restart.setY(restartOriginalY);
      restart.setColor("#dddddd");
    });

    // Return to the Boss Selection Screen
    const bossSelection = this.add
      .text(this.scale.width / 2, 645, "Return to Boss Select", {
        fontFamily: "Science Gothic",
        fontSize: 32,
        color: "#dddddd",
      })
      .setOrigin(0.5)
      .setInteractive();

    // change color on hover
    bossSelection.on("pointerover", () => bossSelection.setColor("#ffffff"));
    bossSelection.on("pointerout", () => bossSelection.setColor("#dddddd"));

    bossSelection.on("pointerup", () => {
      // close the pause menu
      this.scene.stop();

      // Stop the boss scene
      this.scene.stop(this.currentScene);

      // Go back to the boss select
      this.scene.start("BossSelect");
    });
  }
}
