import { EventBus } from "../EventBus";
import { Scene } from "phaser";
import { getBossNameFromSceneKey } from "../Boss Imports/BossLists";

export class GameOver extends Scene {
  constructor() {
    super("GameOver");
  }

  create() {
    this.cameras.main.setBackgroundColor(0x000000);

    // this.add.image(512, 384, "background").setAlpha(0.5);

    this.add
      .text(512, 310, "GAME OVER", {
        fontFamily: '"Science Gothic"',
        fontWeight: "1000",
        fontSize: 72,
        color: "#ff0000",
        stroke: "#e2dfdfff",
        strokeThickness: 10,
        align: "center",
      })
      .setOrigin(0.5)
      .setDepth(100);

    // This is all the timer
    const finalTime = this.registry.get("runTime");
    const bossKey = this.registry.get("runScene");
    const bossName = getBossNameFromSceneKey(bossKey);

    const formatted = this.formatTime(finalTime);

    this.add
      .text(512, 420, `Time: ${formatted}`, {
        fontFamily: "Orbitron",
        fontSize: 32,
        color: "#ffffff",
      })
      .setOrigin(0.5);

    this.add
      .text(512, 210, `Boss: ${bossName}`, {
        fontFamily: "Orbitron",
        fontSize: 24,
        color: "#bbbbbb",
      })
      .setOrigin(0.5);
    //timer ends here ^

    const centerX = this.scale.width / 2;
    const buttonY = 580;

    // Button sprite behind "Restart" text
    const restartOverButton = this.add
      .sprite(centerX - 200, buttonY, "overButton")
      .setOrigin(0.5)
      .setScale(0.4)
      .setDepth(0); // Behind the text

    // Restart the Boss Button
    const restart = this.add
      .text(centerX - 200, buttonY, "RESTART", {
        fontFamily: "Orbitron",
        fontSize: 37,
        color: "#dddddd",
      })
      .setOrigin(0.5)
      .setDepth(1); // In front of the sprite

    // Make text non-interactive - button sprite will handle interactions
    restart.disableInteractive();

    // Store original positions and scale for press effect
    const restartOriginalY = restartOverButton.y;
    const restartOriginalScale = restartOverButton.scaleX;

    // Make button sprite interactive
    restartOverButton.setInteractive({
      useHandCursor: true,
      pixelPerfect: false,
    });

    // Hover effects
    restartOverButton.on("pointerover", () => {
      restart.setColor("#ffffff");
    });

    // Press down effect
    restartOverButton.on("pointerdown", () => {
      restartOverButton.setScale(restartOriginalScale * 0.9);
      restartOverButton.setY(restartOriginalY + 5);
      restart.setY(restartOriginalY + 5);
    });

    // Handle click
    restartOverButton.on("pointerup", () => {
      restartOverButton.setScale(restartOriginalScale);
      restartOverButton.setY(restartOriginalY);
      restart.setY(restartOriginalY);
      // Close GameOver scene
      this.scene.stop();
      // Restart the boss scene
      this.scene.start(bossKey);
    });

    restartOverButton.on("pointerout", () => {
      restartOverButton.setScale(restartOriginalScale);
      restartOverButton.setY(restartOriginalY);
      restart.setY(restartOriginalY);
      restart.setColor("#dddddd");
    });

    // Button sprite behind "Return" text
    const returnOverButton = this.add
      .sprite(centerX + 200, buttonY, "overButton")
      .setOrigin(0.5)
      .setScale(0.4)
      .setDepth(0); // Behind the text

    // Return to the Boss Selection Screen
    const bossSelection = this.add
      .text(centerX + 200, buttonY, "RETURN", {
        fontFamily: "Orbitron",
        fontSize: 37,
        color: "#dddddd",
      })
      .setOrigin(0.5)
      .setDepth(1); // In front of the sprite

    // Make text non-interactive - button sprite will handle interactions
    bossSelection.disableInteractive();

    // Store original positions and scale for press effect
    const returnOriginalY = returnOverButton.y;
    const returnOriginalScale = returnOverButton.scaleX;

    // Make button sprite interactive
    returnOverButton.setInteractive({
      useHandCursor: true,
      pixelPerfect: false,
    });

    // Hover effects
    returnOverButton.on("pointerover", () => {
      bossSelection.setColor("#ffffff");
    });

    // Press down effect -- instead of text
    returnOverButton.on("pointerdown", () => {
      returnOverButton.setScale(returnOriginalScale * 0.9);
      returnOverButton.setY(returnOriginalY + 5);
      bossSelection.setY(returnOriginalY + 5);
    });

    // Handle click
    returnOverButton.on("pointerup", () => {
      returnOverButton.setScale(returnOriginalScale);
      returnOverButton.setY(returnOriginalY);
      bossSelection.setY(returnOriginalY);
      // close GameOver scene
      this.scene.stop();
      // Go back to the boss select
      this.scene.start("BossSelect");
    });

    returnOverButton.on("pointerout", () => {
      returnOverButton.setScale(returnOriginalScale);
      returnOverButton.setY(returnOriginalY);
      bossSelection.setY(returnOriginalY);
      bossSelection.setColor("#dddddd");
    });

    EventBus.emit("current-scene-ready", this);
  }

  // formats the time again for the gameover screen
  formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const tenths = Math.floor((ms % 1000) / 100);

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}.${tenths}`;
  }

  changeScene() {
    this.scene.start("MainMenu");
  }
}
