export function setupRanged(player, scene) {
  // Config for ranged feature
  player.canShoot = true;
  player.shootCooldown = 10000;
  player.projectileSpeed = 500;

  player.prevPointerDownRanged = false;

  return function handleRanged() {
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
    }
  };
}
