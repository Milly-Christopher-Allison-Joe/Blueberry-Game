export function setupRanged(player, scene) {
  // Config for ranged feature
  player.canShoot = true;
  player.rangedCooldown = 10000;
  player.projectileSpeed = 500;

  player.prevPointerDownRanged = false;

  // New Cooldown state for UI
  let cooldown = 0;
  const maxCooldown = player.rangedCooldown;

  // Functions so the UI can check the cooldown
  player.getRangedCooldown = function () {
    return cooldown;
  };
  player.getRangedMaxCooldown = function () {
    return maxCooldown;
  };

  // Handles ranged function. Updated for UI
  return function handleRanged(delta) {
    // Cooldown timer if about 0
    if (cooldown > 0) {
      cooldown -= delta;
      if (cooldown < 0) cooldown = 0; // Stops countdown from going below 0.
    }
    // Makes sure only shoots on fresh button press
    if (
      player.inputEnabled &&
      Phaser.Input.Keyboard.JustDown(player.keys.ranged) &&
      player.canShoot
    ) {
      const projectile = scene.add.circle(player.x, player.y, 5, 0xff0000);
      scene.physics.add.existing(projectile);
      projectile.body.setVelocity(
        player.aimDirection.x * player.projectileSpeed,
        player.aimDirection.y * player.projectileSpeed
      );

      // NEED TO ADD PROJECTILE COLLISION AND DESTROY

      // Cooldown
      player.canShoot = false;
      scene.time.delayedCall(player.shootCooldown, () => {
        player.canShoot = true;
      });

      cooldown = maxCooldown;
    }
  };
}
