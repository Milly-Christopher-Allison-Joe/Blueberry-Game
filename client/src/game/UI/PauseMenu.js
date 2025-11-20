import { Scene } from "phaser";

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
      .text(this.scale.width / 2, 200, "Paused", {
        fontFamily: "Arial Black",
        fontSize: 64,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 8,
      })
      .setOrigin(0.5);

    // Resume button
    const resumeButton = this.add
      .text(this.scale.width / 2, 350, "Resume", {
        fontFamily: "Arial",
        fontSize: 40,
        color: "#dddddd",
      })
      .setOrigin(0.5)
      .setInteractive();

    // change color on hover
    resumeButton.on("pointerover", () => resumeButton.setColor("#ffffff"));
    resumeButton.on("pointerout", () => resumeButton.setColor("#dddddd"));

    resumeButton.on("pointerup", () => {
      // Closes the pause menu
      this.scene.stop();

      // resumes the boss fight
      this.scene.resume(this.currentScene);
    });

    // Restart the Boss Button
    const restart = this.add
      .text(this.scale.width / 2, 430, "Restart", {
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
      // Close pause menu
      this.scene.stop();

      // Stop the scene that was paused
      this.scene.stop(this.currentScene);

      // Restart that same scene
      this.scene.start(this.currentScene);
    });

    // Return to the Boss Selection Screen
    const bossSelection = this.add
      .text(this.scale.width / 2, 510, "Return to Boss Select", {
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
      // close the pause menu
      this.scene.stop();

      // Stop the boss scene
      this.scene.stop(this.currentScene);

      // Go back to the boss select
      this.scene.start("BossSelect");
    });
  }
}
