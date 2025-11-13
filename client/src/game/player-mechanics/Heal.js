export function setupHeal(player, scene) {
  // Config for heal feature
  player.canHeal = true;
  player.healCooldown = 15000; // 15 second cooldown
  player.healAmount = 20;

  return function handleHeal() {
    if (
      player.inputEnabled &&
      player.keys.heal &&
      // Activates on button press
      Phaser.Input.Keyboard.JustDown(player.keys.heal) &&
      player.canHeal
    ) {
      // Heals using damage handler
      player.damageHandler.currentHealth = Math.min(
        player.damageHandler.currentHealth + player.healAmount,
        player.damageHandler.maxHealth
      );
      player.healthBar.update();

      // This starts cooldown
      player.canHeal = false;
      scene.time.delayedCall(player.healCooldown, () => {
        player.canHeal = true;
      });
    }
  };
}
