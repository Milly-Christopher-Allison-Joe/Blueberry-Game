export function setupMelee(player, scene) {
  // Config for melee feature
  player.attackRange = 120;
  player.attackWidth = 30;
  player.attackHeight = 30;
  player.attackDuration = 200;
  player.attackCooldown = 500;
  player.attackDamage = 10;
  player.isAttacking = false;
  player.canAttack = true;

  if (!scene.anims.exists("playerMelee")) {
    scene.anims.create({
      key: "playerMelee",
      frames: scene.anims.generateFrameNumbers("melee", {
        start: 0,
        end: 1,
      }),
      frameRate: 8,
      repeat: 0,
    });
  }

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

      // Rotate it toward the mouse
      const angle = Phaser.Math.Angle.Between(
        player.x,
        player.y,
        pointer.worldX,
        pointer.worldY
      );

      // Sets the offset of the animation
      const offsetDistance = 45;
      const offsetX = Math.cos(angle) * offsetDistance;
      const offsetY = Math.sin(angle) * offsetDistance;

      // Creating a sprite for the attack animation
      const slashSprite = scene.add.sprite(
        player.x + offsetX,
        player.y + offsetY,
        "melee"
      );

      slashSprite.setScale(player.attackRange / 70);

      // Plays the animation
      slashSprite.play("playerMelee");

      // Destroys the animation
      slashSprite.on("animationcomplete", () => {
        slashSprite.destroy();
      });

      // Makes sure the animation is updated with movement
      const followUpdate = () => {
        // Recalculate angle each frame
        const currentAngle = Phaser.Math.Angle.Between(
          player.x,
          player.y,
          pointer.worldX,
          pointer.worldY
        );

        // Recalculate offset each frame
        const dynamicOffsetX = Math.cos(currentAngle) * offsetDistance;
        const dynamicOffsetY = Math.sin(currentAngle) * offsetDistance;

        // Update slash position
        slashSprite.x = player.x + dynamicOffsetX;
        slashSprite.y = player.y + dynamicOffsetY;

        // Update rotation
        slashSprite.rotation = currentAngle;
      };

      scene.events.on("update", followUpdate);

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
