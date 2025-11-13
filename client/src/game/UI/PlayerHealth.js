export class PlayerHealth {
  // this sets basic config for the health bar
  constructor(scene, player, barWidth = 40, barHeight = 6) {
    this.scene = scene;
    this.player = player;
    this.barWidth = barWidth;
    this.barHeight = barHeight;
    this.graphics = scene.add.graphics();
    this.update();
  }
  update() {
    // This gets the health from Damage.js
    const current = this.player.damageHandler.currentHealth;
    const max = this.player.damageHandler.maxHealth;

    // This creates the visual
    this.graphics.clear();
    this.graphics.fillStyle(0x000000, 0); // this makes makes the backgroud of the health bar transparent
    this.graphics.fillStyle(0xff0000, 1); // makes the players health red
    this.graphics.fillRect(
      // Health bar is a rectangle, can change with sprite if we want
      -this.barWidth / 2,
      -30,
      this.barWidth * (current / max),
      this.barHeight
    );
  }

  // This sets the health bar location
  setPosition(x, y) {
    this.graphics.x = x;
    this.graphics.y = y;
  }
}
