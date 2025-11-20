export class BossDamage {
  constructor(boss, maxHealth = 2000) {
    this.boss = boss;
    this.maxHealth = maxHealth;
    this.currentHealth = maxHealth;
    this.dead = false;
  }

  take(amount) {
    if (this.dead) return;
    this.currentHealth -= amount;
    if (this.currentHealth <= 0) {
      this.currentHealth = 0;
      this.dead = true;
      if (this.boss?.onDeath) this.boss.onDeath();
    }
  }

  percent() {
    return this.currentHealth / this.maxHealth;
  }
}
