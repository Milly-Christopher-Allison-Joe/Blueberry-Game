export class PlayerAbilityIcons {
  constructor(scene, player) {
    this.scene = scene;
    this.player = player;

    // For size of cooldown icons
    this.iconSize = 45;
    this.spacing = 3;

    // This defines the abilities and their icons
    this.abilities = [
      {
        key: "dash",
        emoji: "➔",
        label: "dash",
        getCooldown: () => player.getDashCooldown(),
        getMaxCooldown: () => player.getDashMaxCooldown(),
      },
      {
        key: "heal",
        emoji: "✚",
        label: "heal",
        getCooldown: () => player.getHealCooldown(),
        getMaxCooldown: () => player.getHealMaxCooldown(),
      },
      {
        key: "ranged",
        emoji: "❈",
        label: "ranged",
        getCooldown: () => player.getRangedCooldown(),
        getMaxCooldown: () => player.getRangedMaxCooldown(),
      },
    ];

    // This creates containters for the icons
    this.icons = this.abilities.map((ability, i) => {
      const x =
        (i - (this.abilities.length - 1) / 2) * (this.iconSize + this.spacing);

      // This makes emoji's work with Phaser text. Can remove if switched to sprites.
      const emojiText = scene.add
        .text(0, 0, ability.emoji, {
          font: `${this.iconSize - 6}px Arial`,
          color: "#fff",
          align: "center",
        })
        .setOrigin(0.5);

      // Label text centered below icons
      const labelText = scene.add
        .text(0, this.iconSize / 2 + 8, ability.label, {
          font: "12px Arial",
          color: "#fff",
          align: "center",
        })
        .setOrigin(0.5, 0);

      // Icons are at bottom left of the screen
      const cam = scene.cameras.main;
      const fixedX = cam.width / 2 + x;
      const fixedY = cam.height - 115;
      const container = scene.add.container(fixedX, fixedY, [
        emojiText,
        labelText,
      ]);
      container.setScrollFactor(0);
      container.setDepth(10000);

      return { container, ability, x };
    });
  }

  // This updates icon positions and fade effect for cooldowns
  update() {
    this.icons.forEach(({ container, ability }) => {
      const cooldown = ability.getCooldown();
      const maxCooldown = ability.getMaxCooldown();

      // Fade icon if on cooldown, fully visible if ready
      if (cooldown > 0 && maxCooldown > 0) {
        container.alpha = 0.2;
      } else {
        container.alpha = 1;
      }
    });
  }
  // Here just in case. Shouldn't be necessary but could help prevent memory leak.
  destroy() {
    this.icons.forEach(({ container }) => container.destroy());
  }
}
