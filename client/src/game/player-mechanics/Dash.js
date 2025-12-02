import Phaser from "phaser";

export function setupDash(player, scene, keys) {
  // Config for dash feature
  player.dashSpeed = 800;
  player.dashDuration = 250;
  player.dashCooldown = 3000;
  player.isDashing = false;
  player.canDash = true;
  player.dashDirection = { x: 0, y: 0 };

  // New Cooldown state for UI
  let cooldown = 0;
  const maxCooldown = player.dashCooldown;

  // Functions so the UI can check the cooldown
  player.getDashCooldown = function () {
    return cooldown;
  };
  player.getDashMaxCooldown = function () {
    return maxCooldown;
  };

  // Handles dash mechanic NEW DELTA: Setup for time since last frame. Needed for cooldown timer.
  return function handleDash(delta) {
    // Cooldown timer if about 0
    if (cooldown > 0) {
      cooldown -= delta;
      if (cooldown < 0) cooldown = 0; // Stops countdown from going below 0.
    }
    // Base function for dash
    if (
      Phaser.Input.Keyboard.JustDown(keys.dash) &&
      player.canDash &&
      !player.isDashing &&
      cooldown === 0 // Can only dash if cooldown is 0!!
    ) {
      let dashX = 0;
      let dashY = 0;

      if (keys.left.isDown) dashX = -1;
      if (keys.right.isDown) dashX = 1;
      if (keys.up.isDown) dashY = -1;
      if (keys.down.isDown) dashY = 1;

      // If no direction pressed, dash right by default
      if (dashX === 0 && dashY === 0) {
        dashX = 1;
      }

      // Normalize diagonal dashes so they're not faster
      const length = Math.sqrt(dashX * dashX + dashY * dashY);
      if (length > 0) {
        dashX /= length;
        dashY /= length;
      }

      // Store dash direction
      player.dashDirection.x = dashX;
      player.dashDirection.y = dashY;

      // Start dash
      player.isDashing = true;
      player.canDash = false;

      // Apply dash velocity
      player.setVelocity(
        player.dashDirection.x * player.dashSpeed,
        player.dashDirection.y * player.dashSpeed
      );

      // End dash after duration
      scene.time.delayedCall(player.dashDuration, () => {
        player.isDashing = false;
        player.setAlpha(1);
        if (player.visualBox) player.visualBox.setAlpha(1);
      });

      // Reset cooldown
      scene.time.delayedCall(player.dashCooldown, () => {
        player.canDash = true;
      });

      // Start the cooldown timer
      cooldown = maxCooldown;
    }
  };
}
