import { EventBus } from "../EventBus";
import { Scene } from "phaser";

export class Plexus extends Scene {
  constructor() {
    super("Plexus");
  }

  create() {
    const worldWidth = 4000;
    const worldHeight = 800;
    const hallwayY = worldHeight / 2;
    const hallwayHeight = 500;

    // camera and physics boundaries
    this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);
    this.physics.world.setBounds(0, 0, worldWidth, worldHeight);

    // background
    this.bg = this.add
      .tileSprite(0, 0, worldWidth, worldHeight, "background")
      .setOrigin(0, 0)
      .setScrollFactor(0.2);

    // Hallway floor
    this.hallway = this.add.rectangle(
      worldWidth / 2,
      hallwayY,
      worldWidth,
      hallwayHeight,
      0x222222
    );

    // Boundary walls
    this.topWall = this.add.rectangle(
      worldWidth / 2,
      hallwayY - hallwayHeight / 2 - 10,
      worldWidth,
      20,
      0xff0000,
      0
    );
    this.physics.add.existing(this.topWall);
    // here be dragons
    this.topWall.body.setImmovable(true);
    this.topWall.body.setAllowGravity(false);
    this.topWall.body.setSize(worldWidth, 20);

    this.bottomWall = this.add.rectangle(
      worldWidth / 2,
      hallwayY + hallwayHeight / 2 + 10,
      worldWidth,
      20,
      0xff0000,
      0
    );
    this.physics.add.existing(this.bottomWall);
    // here be dragons
    this.bottomWall.body.setImmovable(true);
    this.bottomWall.body.setAllowGravity(false);
    this.bottomWall.body.setSize(worldWidth, 20);

    // Hallway physics
    this.physics.add.existing(this.hallway, true);

    // TEMP PLAYER! CHRIS YOU CAN DELETE THIS! I made this so make sure the camera works, just make sure you replace this with your character logic. They're literally just a dumb box
    this.player = this.physics.add
      .sprite(200, worldHeight / 2, null)
      .setSize(20, 20)
      .setTint(0xffffff);

    const box = this.add.rectangle(200, worldHeight / 2, 20, 20, 0xffffff);
    this.playerBox = box;
    this.playerBox.setDepth(20);

    this.player.setCollideWorldBounds(true);

    // Collision between Hallway and Player
    this.physics.add.collider(this.player, this.hallway);
    this.physics.add.collider(this.player, this.topWall);
    this.physics.add.collider(this.player, this.bottomWall);

    // camera follow and zoom logic for the player
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    this.cameras.main.setZoom(1.2);

    // Rudementary movement keys, shoot this in the butt
    this.keys = this.input.keyboard.addKeys({
      up: "W",
      down: "S",
      left: "A",
      right: "D",
    });

    EventBus.emit("current-scene-ready", this);
  }

  update() {
    //parallax scroll with background
    this.bg.tilePositionX = this.cameras.main.scrollX * 0.2;

    //Character movement bullshit, please change this how you want Chris I just needed it to test
    const speed = 200;
    this.player.setVelocity(0);

    if (this.keys.left.isDown) {
      this.player.setVelocityX(-speed);
    }
    if (this.keys.right.isDown) {
      this.player.setVelocityX(speed);
    }
    if (this.keys.up.isDown) {
      this.player.setVelocityY(-speed - 200);
    }
    if (this.keys.down.isDown) {
      this.player.setVelocityY(speed + 200);
    }

    this.playerBox.x = this.player.x;
    this.playerBox.y = this.player.y;
  }

  changeScene() {
    this.scene.start("GameOver");
  }
}
