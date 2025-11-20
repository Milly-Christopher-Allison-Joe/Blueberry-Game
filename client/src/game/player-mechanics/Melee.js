export function setupMelee(player, scene) {
  // Config for melee feature
  player.attackRange = 100;
  player.attackWidth = 30;
  player.attackHeight = 30;
  player.attackDuration = 200;
  player.attackCooldown = 500;
  player.attackDamage = 10;
  player.isAttacking = false;
  player.canAttack = true;

  return function handleMelee() {
    const pointer = scene.input.activePointer;

    // This checks if the left mouse button is clicked and the player can attack
    if (
      player.inputEnabled &&
      pointer.isDown &&
      !player.prevPointerDown && // was not down last frame
      player.canAttack &&
      !player.isAttacking
    ) {
      // checks if boss is in melee range
      const boss = scene.boss;
      if (boss && boss.damageHandler) {
        const dist = Phaser.Math.Distance.Between(
          player.x,
          player.y,
          boss.x,
          boss.y
        );
        // does damage
        if (dist <= player.attackRange) {
          boss.damageHandler.take(player.attackDamage);
        }
      }

      // Prevents multiple attacks from holding button
      player.isAttacking = true;
      player.canAttack = false;

      // Reset attack state after player.attackDuration
      scene.time.delayedCall(player.attackDuration, () => {
        player.isAttacking = false;
      });

      // Resets cooldown
      scene.time.delayedCall(player.attackCooldown, () => {
        player.canAttack = true;
      });
    }
  };
}
