export class BossDamage {
  constructor(boss, maxHealth = 100) {
    this.boss = boss;
    this.max = maxHealth;
    this.hp = maxHealth;
    this.dead = false;
  }

  take(amount) {
    if (this.dead) return;
    this.hp -= amount;
    if (this.hp <= 0) {
      this.hp = 0;
      this.dead = true;
      if (this.boss?.onDeath) this.boss.onDeath();
    }
  }

  percent() {
    return this.hp / this.max;
  }
}
