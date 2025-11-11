import { EventBus } from "../EventBus";
import { Scene } from "phaser";
import { Player } from "../objects/Player";
import { PlexusBoss } from "../objects/PlexusBoss";

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

    // Create player instance
    this.player = new Player(this, 200, worldHeight / 2);
    this.player.setupCamera(1.2);

    // Create Boss in front of player at start
    const bossX = this.player.x + 400;
    const bossY = this.player.y;

    this.boss = new PlexusBoss(this, bossX, bossY);

    // Collision between Hallway and Player
    this.physics.add.collider(this.player, this.hallway);
    this.physics.add.collider(this.player, this.topWall);
    this.physics.add.collider(this.player, this.bottomWall);

    // Boss and Player collision
    this.physics.add.collider(this.player, this.boss);

    EventBus.emit("current-scene-ready", this);
  }

  update() {
    //parallax scroll with background
    this.bg.tilePositionX = this.cameras.main.scrollX * 0.2;

    // updates player
    if (this.player) this.player.update();

    //updates boss
    if (this.boss) this.boss.update();
  }

  changeScene() {
    this.scene.start("GameOver");
  }
}
