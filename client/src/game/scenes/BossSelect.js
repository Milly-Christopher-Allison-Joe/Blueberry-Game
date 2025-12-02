import Phaser from "phaser";
import { bosses } from "../Boss Imports/BossLists";

export class BossSelect extends Phaser.Scene {
  constructor() {
    super("BossSelect");
  }

  create() {
    const { width, height } = this.scale;

    // Draw the background, centered - make it non-interactive
    const bg = this.add.image(width / 2, height / 2, "background");
    bg.setOrigin(0.5);

    // Scale background to fill screen but maintain aspect ratio
    const scaleX = width / bg.width;
    const scaleY = height / bg.height;
    const scale = Math.max(scaleX, scaleY);
    bg.setScale(scale);
    bg.disableInteractive(); // Ensure background doesn't capture clicks

    // simple title menu text
    this.add
      .text(width / 2, 150, "Choose A Boss", {
        fontFamily: '"Orbitron", sans-serif',
        fontSize: "40px",
        fontStyle: "bold",
        color: "#ffffffff",
      })
      .setOrigin(0.5);

    // full transperancy, i wanted the buttons to press down when clicked and I tried looking up best ways but the two boss select buttons were overlapping so it would press the wrong boss so I resorted to AI and even with that it took a while to get it to work but this is what finally worked.

    this.input.setTopOnly(true);

    bosses.forEach((boss, index) => {
      const y = 330 + index * 200;

      // button sprite behind the boss name
      const buttonSprite = this.add
        .sprite(width / 2, y, "buttonSprite")
        .setOrigin(0.5)
        .setScale(0.4)
        .setDepth(0);

      const bossText = this.add
        .text(width / 2, y, boss.name, {
          font: "30px Orbitron",
          fill: "#dddddd",
        })
        .setOrigin(0.5)
        .setDepth(1);

      // Make text non-interactive immediately - button sprite will handle all interactions
      bossText.disableInteractive();

      // Store boss data in a closure to ensure correct boss is selected
      const bossData = boss;
      const originalY = buttonSprite.y;
      const originalScale = buttonSprite.scaleX;

      // Set up interactivity - use natural sprite bounds, no custom hit area
      buttonSprite.setInteractive({
        useHandCursor: true,
        pixelPerfect: false,
      });

      // Add hover effect
      buttonSprite.on("pointerover", () => {
        bossText.setColor("#ffffff");
      });

      // Press down effect - use closure to capture correct button
      buttonSprite.on("pointerdown", () => {
        buttonSprite.setScale(originalScale * 0.9);
        buttonSprite.setY(originalY + 5);
        bossText.setY(originalY + 5);
      });

      // Restore on pointer up and handle click
      buttonSprite.on("pointerup", () => {
        buttonSprite.setScale(originalScale);
        buttonSprite.setY(originalY);
        bossText.setY(originalY);
        // Use bossData from closure to ensure correct boss is selected
        this.registry.set("selectedBoss", bossData.id);
        this.scene.start(bossData.sceneKey);
      });

      buttonSprite.on("pointerout", () => {
        buttonSprite.setScale(originalScale);
        buttonSprite.setY(originalY);
        bossText.setY(originalY);
        bossText.setColor("#dddddd");
      });
      buttonSprite.setDepth(100 - index);
      bossText.setDepth(101 - index);
    });

    // Back button
    const back = this.add
      .text(width / 2, height - 80, "↩ Back", {
        font: "28px Arial",
        fill: "#aaaaaa",
      })
      .setOrigin(0.5)
      .setDepth(200); // Higher than all boss buttons (which are at depth 100-101)

    back.setInteractive({ useHandCursor: true });
    back.on("pointerover", () => back.setColor("#ffffff"));
    back.on("pointerout", () => back.setColor("#aaaaaa"));

    // Navigate back to MainMenu on click - - wasnt working at first
    back.on("pointerup", () => {
      this.scene.start("MainMenu");
    });
  }
}
