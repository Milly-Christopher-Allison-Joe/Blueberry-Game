export class PlayerAbilityIcons {
  constructor(scene, player) {
    this.scene = scene;
    this.player = player;

    // For size and position of cooldown icons
    this.iconSize = 20;
    this.spacing = 1;
    this.yOffset = -40;

    // This defines the abilities and their icons
    this.abilities = [
      {
        key: "dash",
        emoji: "➔",
        getCooldown: () => player.getDashCooldown(),
        getMaxCooldown: () => player.getDashMaxCooldown(),
      },
      {
        key: "heal",
        emoji: "✚",
        getCooldown: () => player.getHealCooldown(),
        getMaxCooldown: () => player.getHealMaxCooldown(),
      },
      {
        key: "ranged",
        emoji: "❈",
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

      // This groups them in a container
      const container = scene.add.container(
        player.x + x,
        player.y + this.yOffset,
        [emojiText]
      );
      container.setDepth(10000);

      return { container, ability, x };
    });
  }

  // This updates icon positions and fade effect for cooldowns
  update() {
    this.icons.forEach(({ container, ability, x }) => {
      container.x = this.player.x + x;
      container.y = this.player.y + this.yOffset;

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
