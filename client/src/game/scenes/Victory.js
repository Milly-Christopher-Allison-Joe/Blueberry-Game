import { Scene } from "phaser";
import { EventBus } from "../EventBus";
import { getBossNameFromSceneKey } from "../Boss Imports/BossLists";

export class Victory extends Scene {
  constructor() {
    super("Victory");
  }

  create() {
    this.cameras.main.setBackgroundColor(0x004d26); // bright victory green
    this.add.image(512, 384, "background").setAlpha(0.4);

    // Victory Text
    this.add
      .text(512, 340, "VICTORY!", {
        fontFamily: "Science Gothic",
        fontSize: 72,
        color: "#ffffff",
        stroke: "#09000eff",
        strokeThickness: 10,
      })
      .setOrigin(0.5);

    // Variables for the timer on victory screen
    const finalTime = this.registry.get("runTime");
    const bossKey = this.registry.get("runScene");
    const bossName = getBossNameFromSceneKey(bossKey);

    const formatted = this.formatTime(finalTime);

    // Victory Time
    this.add
      .text(512, 240, `Time: ${formatted}`, {
        fontFamily: "Orbitron",
        fontSize: 32,
        color: "#ffffff",
      })
      .setOrigin(0.5);

    // Defeated Boss Name
    this.add
      .text(512, 450, `Defeated: ${bossName}`, {
        fontFamily: "Orbitron",
        fontSize: 28,
        color: "#dddddd",
      })
      .setOrigin(0.5);

    // Creates an event with the timer to grab in React
    if (finalTime && bossKey) {
      window.dispatchEvent(
        new CustomEvent("submit-highscore", {
          detail: { bossId: bossKey, time: finalTime },
        })
      );
    }

    const centerX = this.scale.width / 2;
    const buttonY = 620;

    // Button sprite behind "Restart" text
    const restartVictoryButton = this.add
      .sprite(centerX - 200, buttonY, "victorySprite")
      .setOrigin(0.5)
      .setScale(0.4)
      .setDepth(0); // Behind the text

    // Restart the Boss Button text
    const restart = this.add
      .text(centerX - 200, buttonY, "Restart", {
        fontFamily: "Orbitron",
        fontSize: 40,
        color: "#dddddd",
      })
      .setOrigin(0.5)
      .setDepth(1); // In front of the sprite

    // Make text non-interactive - button sprite will handle interactions
    restart.disableInteractive();

    // Store original positions and scale for press effect
    const restartOriginalY = restartVictoryButton.y;
    const restartOriginalScale = restartVictoryButton.scaleX;

    // Make button sprite interactive
    restartVictoryButton.setInteractive({
      useHandCursor: true,
      pixelPerfect: false,
    });

    // Hover effects
    restartVictoryButton.on("pointerover", () => {
      restart.setColor("#ffffff");
    });

    // Press down effect
    restartVictoryButton.on("pointerdown", () => {
      restartVictoryButton.setScale(restartOriginalScale * 0.9);
      restartVictoryButton.setY(restartOriginalY + 5);
      restart.setY(restartOriginalY + 5);
    });

    // Handle click
    restartVictoryButton.on("pointerup", () => {
      restartVictoryButton.setScale(restartOriginalScale);
      restartVictoryButton.setY(restartOriginalY);
      restart.setY(restartOriginalY);
      // Close Victory scene
      this.scene.stop();
      // Restart the boss scene
      this.scene.start(bossKey);
    });

    restartVictoryButton.on("pointerout", () => {
      restartVictoryButton.setScale(restartOriginalScale);
      restartVictoryButton.setY(restartOriginalY);
      restart.setY(restartOriginalY);
      restart.setColor("#dddddd");
    });

    // Button sprite behind "Return" text
    const returnVictoryButton = this.add
      .sprite(centerX + 200, buttonY, "victorySprite")
      .setOrigin(0.5)
      .setScale(0.4)
      .setDepth(0); // Behind the text

    // Return to the Boss Selection Screen text
    const bossSelection = this.add
      .text(centerX + 200, buttonY, "Return", {
        fontFamily: "Orbitron",
        fontSize: 40,
        color: "#dddddd",
      })
      .setOrigin(0.5)
      .setDepth(1); // In front of the sprite

    // Make text non-interactive - button sprite will handle interactions
    bossSelection.disableInteractive();

    // Store original positions and scale for press effect
    const returnOriginalY = returnVictoryButton.y;
    const returnOriginalScale = returnVictoryButton.scaleX;

    // Make button sprite interactive
    returnVictoryButton.setInteractive({
      useHandCursor: true,
      pixelPerfect: false,
    });

    // Hover effects
    returnVictoryButton.on("pointerover", () => {
      bossSelection.setColor("#ffffff");
    });

    // Press down effect
    returnVictoryButton.on("pointerdown", () => {
      returnVictoryButton.setScale(returnOriginalScale * 0.9);
      returnVictoryButton.setY(returnOriginalY + 5);
      bossSelection.setY(returnOriginalY + 5);
    });

    // Handle click
    returnVictoryButton.on("pointerup", () => {
      returnVictoryButton.setScale(returnOriginalScale);
      returnVictoryButton.setY(returnOriginalY);
      bossSelection.setY(returnOriginalY);
      // close Victory scene
      this.scene.stop();
      // Go back to the boss select
      this.scene.start("BossSelect");
    });

    returnVictoryButton.on("pointerout", () => {
      returnVictoryButton.setScale(returnOriginalScale);
      returnVictoryButton.setY(returnOriginalY);
      bossSelection.setY(returnOriginalY);
      bossSelection.setColor("#dddddd");
    });

    EventBus.emit("current-scene-ready", this);
  }

  formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const tenths = Math.floor((ms % 1000) / 100);

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}.${tenths}`;
  }
}
