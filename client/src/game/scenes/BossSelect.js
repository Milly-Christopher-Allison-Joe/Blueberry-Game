import Phaser from "phaser";

export class BossSelect extends Phaser.Scene {
  constructor() {
    super("BossSelect");
  }

  create() {
    const { width, height } = this.scale;

    // Draw the background, centered
    const bg = this.add.image(width / 2, height / 2, "background");
    bg.setOrigin(0.5);

    // Scale background to fill screen but maintain aspect ratio
    const scaleX = width / bg.width;
    const scaleY = height / bg.height;
    const scale = Math.max(scaleX, scaleY);
    bg.setScale(scale);

    // simple title menu text
    this.add
      .text(width / 2, 150, "Choose A Boss", {
        fontFamily: '"Orbitron", sans-serif',
        fontSize: "40px",
        fontStyle: "bold",
        color: "#ffffffff",
      })
      .setOrigin(0.5);

    // list of bosses, can be expanded
    const bosses = [
      { name: "Plexus Sentinel", sceneKey: "Plexus", id: "plexus" },
      { name: "Placeholder", sceneKey: "Placeholder", id: "placeholder" },
    ];

    // full transperancy, i wanted the buttons to press down when clicked and I tried looking up best ways but the two boss select buttons were overlapping so it would press the wrong boss so I resorted to AI and even with that it took a while to get it to work but this is what finally worked.

    bosses.forEach((boss, index) => {
      const y = 330 + index * 200;

      // button sprite behind the boss name
      const buttonSprite = this.add
        .sprite(width / 2, y, "buttonSprite")
        .setOrigin(0.5)
        .setScale(0.4);

      const bossText = this.add
        .text(width / 2, y, boss.name, {
          font: "30px Orbitron",
          fill: "#dddddd",
        })
        .setOrigin(0.5);

      // if felt like the two buttons were overlapping so it would press the wrong boss.
      const originalY = buttonSprite.y;
      const originalScale = buttonSprite.scaleX;

      // Store boss data in a closure to ensure correct boss is selected and wrong one isnt selected.
      const bossData = boss;
      const hitAreaWidth = 250;
      const hitAreaHeight = 70;
      buttonSprite.setInteractive({
        useHandCursor: true,
        hitArea: new Phaser.Geom.Rectangle(
          -hitAreaWidth / 2,
          -hitAreaHeight / 2,
          hitAreaWidth,
          hitAreaHeight
        ),
        pixelPerfect: false,
      });

      // Press down effect
      buttonSprite.on("pointerdown", () => {
        buttonSprite.setScale(originalScale * 0.9);
        buttonSprite.setY(originalY + 5);
        bossText.setY(originalY + 5);
      });

      // Restore on pointer up
      buttonSprite.on("pointerup", () => {
        buttonSprite.setScale(originalScale);
        buttonSprite.setY(originalY);
        bossText.setY(originalY);
        this.registry.set("selectedBoss", bossData.id);
        this.scene.start(bossData.sceneKey);
      });
      buttonSprite.on("pointerout", () => {
        buttonSprite.setScale(originalScale);
        buttonSprite.setY(originalY);
        bossText.setY(originalY);
      });

      // Set interactive with explicit hit area for boss text (same size as button)
      bossText.setInteractive({
        useHandCursor: true,
        hitArea: new Phaser.Geom.Rectangle(
          -hitAreaWidth / 2,
          -hitAreaHeight / 2,
          hitAreaWidth,
          hitAreaHeight
        ),
        pixelPerfect: false,
      });

      bossText.on("pointerover", () => bossText.setColor("#ffffff"));
      bossText.on("pointerout", () => bossText.setColor("#dddddd"));

      bossText.on("pointerdown", () => {
        // Press down effect on text (sync with button)
        buttonSprite.setScale(originalScale * 0.9);
        buttonSprite.setY(originalY + 5);
        bossText.setY(originalY + 5);
      });

      bossText.on("pointerup", () => {
        // Restore and start scene
        buttonSprite.setScale(originalScale);
        buttonSprite.setY(originalY);
        bossText.setY(originalY);

        this.registry.set("selectedBoss", bossData.id);
        this.scene.start(bossData.sceneKey);
      });

      bossText.on("pointerout", () => {
        buttonSprite.setScale(originalScale);
        buttonSprite.setY(originalY);
        bossText.setY(originalY);
      });
    });

    // Back button
    const back = this.add
      .text(width / 2, height - 80, "↩ Back", {
        font: "28px Arial",
        fill: "#aaaaaa",
      })
      .setOrigin(0.5);

    back.setInteractive({ useHandCursor: true });
    back.on("pointerover", () => back.setColor("#ffffff"));
    back.on("pointerout", () => back.setColor("#aaaaaa"));
    back.on("pointerdown", () => this.scene.start("MainMenu"));
  }
}
