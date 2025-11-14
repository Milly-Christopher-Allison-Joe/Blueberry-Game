export function setupHeal(player, scene) {
  // Config for heal feature
  player.canHeal = true;
  player.healCooldown = 15000; // 15 second cooldown
  player.healAmount = 20;

  // New Cooldown state for UI
  let cooldown = 0;
  const maxCooldown = player.healCooldown;

  // Functions so the UI can check the cooldown
  player.getHealCooldown = function () {
    return cooldown;
  };
  player.getHealMaxCooldown = function () {
    return maxCooldown;
  };

  // Handles heal mechanic. Updated for UI
  return function handleHeal(delta) {
    // Cooldown timer if about 0
    if (cooldown > 0) {
      cooldown -= delta;
      if (cooldown < 0) cooldown = 0; // Stops cooldown from going below 0.
    }
    if (
      player.inputEnabled &&
      player.keys.heal &&
      // Activates on button press
      Phaser.Input.Keyboard.JustDown(player.keys.heal) &&
      player.canHeal &&
      cooldown === 0 // Can only heal if cooldown is 0!!
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

      cooldown = maxCooldown;
    }
  };
}
