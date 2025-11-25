import { Scene } from "phaser";
import { EventBus } from "../EventBus";
import { getBossNameFromSceneKey } from "../Boss Imports/BossLists";

export class Victory extends Scene {
  constructor() {
    super("Victory");
  }

  create() {
    this.cameras.main.setBackgroundColor(0x1aff00); // bright victory green
    this.add.image(512, 384, "background").setAlpha(0.4);

    // Victory Text
    this.add
      .text(512, 300, "Victory!", {
        fontFamily: "Arial Black",
        fontSize: 72,
        color: "#ffffff",
        stroke: "#000000",
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
      .text(512, 400, `Time: ${formatted}`, {
        fontSize: 32,
        color: "#ffffff",
      })
      .setOrigin(0.5);

    // Defeated Boss Name
    this.add
      .text(512, 450, `Defeated: ${bossName}`, {
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

    // Restart the Boss Button
    const restart = this.add
      .text(centerX - 200, buttonY, "Restart Boss", {
        fontFamily: "Arial",
        fontSize: 40,
        color: "#dddddd",
      })
      .setOrigin(0.5)
      .setInteractive();

    // change color on hover
    restart.on("pointerover", () => restart.setColor("#ffffff"));
    restart.on("pointerout", () => restart.setColor("#dddddd"));

    restart.on("pointerup", () => {
      // Close GameOver scene
      this.scene.stop();

      // Restart the boss scene
      this.scene.start(bossKey);
    });

    // Return to the Boss Selection Screen
    const bossSelection = this.add
      .text(centerX + 200, buttonY, "Return to Boss Select", {
        fontFamily: "Arial",
        fontSize: 32,
        color: "#dddddd",
      })
      .setOrigin(0.5)
      .setInteractive();

    // change color on hover
    bossSelection.on("pointerover", () => bossSelection.setColor("#ffffff"));
    bossSelection.on("pointerout", () => bossSelection.setColor("#dddddd"));

    bossSelection.on("pointerup", () => {
      // close GameOver scene
      this.scene.stop();

      // Go back to the boss select
      this.scene.start("BossSelect");
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
