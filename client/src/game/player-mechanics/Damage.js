export class Damage {
  constructor(player, maxHealth = 100) {
    this.player = player;
    this.maxHealth = maxHealth;
    this.currentHealth = maxHealth;
  }
  takeDamage(amount) {
    // Makes player immune during dash
    if (this.player.isDashing) {
      return;
    }
    // This handles damage to the players health
    this.currentHealth = Math.max(this.currentHealth - amount, 0);
    if (this.currentHealth === 0) {
      this.handleDeath();
    }
  }

  handleDeath() {
    // This makes the player disappear after death
    this.player.setActive(false);
    this.player.setVisible(false);
    // Triggers GameOver
    this.player.scene.scene.start("GameOver");
  }
}
