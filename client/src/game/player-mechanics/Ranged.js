export function setupRanged(player, scene) {
  // Config for ranged feature
  player.canShoot = true;
  player.rangedCooldown = 10000;
  player.projectileSpeed = 500;

  player.prevPointerDownRanged = false;

  // spawning the sprite projectile and setting it's frames and framerate
  if (!scene.anims.exists("playerRanged")) {
    scene.anims.create({
      key: "playerRanged",
      frames: scene.anims.generateFrameNumbers("rangedattack", {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });
  }

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
      const projectile = scene.add.sprite(player.x, player.y, "rangedattack");
      scene.physics.add.existing(projectile);
      // sets the direction of the projectile to match aim
      const angle = Phaser.Math.Angle.Between(
        0,
        0,
        player.aimDirection.x,
        player.aimDirection.y
      );
      projectile.rotation = angle + Math.PI;

      // applies velocity to the projectile
      projectile.body.setVelocity(
        player.aimDirection.x * player.projectileSpeed,
        player.aimDirection.y * player.projectileSpeed
      );

      projectile.setScale(1.6);
      projectile.play("playerRanged");

      // Destroys projectile and registers damage on boss contact
      scene.physics.add.overlap(projectile, scene.boss, () => {
        projectile.destroy();
        if (scene.boss && scene.boss.damageHandler) {
          scene.boss.damageHandler.take(30);
        }
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
