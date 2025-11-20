import { EventBus } from "../EventBus";
import { Scene } from "phaser";
import { getBossNameFromSceneKey } from "../Boss Imports/BossLists";

export class GameOver extends Scene {
  constructor() {
    super("GameOver");
  }

  create() {
    this.cameras.main.setBackgroundColor(0xff0000);

    this.add.image(512, 384, "background").setAlpha(0.5);

    this.add
      .text(512, 384, "Game Over", {
        fontFamily: "Arial Black",
        fontSize: 64,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 8,
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
      .text(512, 480, `Time: ${formatted}`, {
        fontFamily: "Arial",
        fontSize: 32,
        color: "#ffffff",
      })
      .setOrigin(0.5);

    this.add
      .text(512, 530, `Boss: ${bossName}`, {
        fontFamily: "Arial",
        fontSize: 24,
        color: "#bbbbbb",
      })
      .setOrigin(0.5);
    //timer ends here ^

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
