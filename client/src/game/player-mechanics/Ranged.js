export function setupRanged(player, scene) {
  // Config for ranged feature
  player.canShoot = true;
  player.rangedCooldown = 10000;
  player.projectileSpeed = 500;

  player.prevPointerDownRanged = false;

  // This sets world bounds for projectile
  if (!scene.projectileWorldBoundsHandler) {
    scene.physics.world.on("worldbounds", (body) => {
      if (body.gameObject && body.gameObject.active) {
        body.gameObject.destroy();
      }
    });
    scene.projectileWorldBoundsHandler = true; // This prevents duplicate handlers
  }

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

      // Destroys projectile on boss contact
      scene.physics.add.overlap(projectile, scene.boss, () => {
        projectile.destroy();
        // Can add more boss logic here if needed
      });

      // Destroys projectile on contact with anything out of bounds
      projectile.body.setCollideWorldBounds(true);
      projectile.body.onWorldBounds = true;
      scene.physics.add.collider(projectile, scene.topWall, () => {
        projectile.destroy();
      });
      scene.physics.add.collider(projectile, scene.bottomWall, () => {
        projectile.destroy();
      });

      // Cooldown
      player.canShoot = false;
      scene.time.delayedCall(player.rangedCooldown, () => {
        player.canShoot = true;
      });

      cooldown = maxCooldown;
    }
  };
}
