import { EventBus } from "../EventBus";
import { Scene } from "phaser";
import { Player } from "../objects/Player";
import { PlexusBoss } from "../objects/PlexusBoss";
import { KillLine } from "../objects/Plexus Mechanics/KillLine";

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

    // Initial Phase Logic
    this.currentPhase = 1;
    this.phaseActive = false;

    this.startNextPhase();

    // Create the kill line laser wall
    this.killLine = new KillLine(this, bossX + 150, worldHeight / 2);

    // // Attack cycle loop for Drop Circle
    // this.time.addEvent({
    //   delay: 1000,
    //   loop: true,
    //   callback: () => {
    //     if (!this.boss || this.boss.isDropping) return;
    //     this.boss.startDropCircleMechanic(this.player);
    //   },
    // });

    // // Periodically trigger soak mechanic
    // this.time.addEvent({
    //   delay: 1000,
    //   loop: true,
    //   callback: () => {
    //     if (this.boss && !this.boss.isSoaking) {
    //       this.boss.startSoakMechanic(this.player);
    //     }
    //   },
    // });

    // // Periodically trigger the kill sweep laser mechanic
    // this.time.addEvent({
    //   delay: 100,
    //   loop: true,
    //   callback: () => {
    //     if (this.boss && !this.boss.isSweeping) {
    //       this.boss.startKillSweep(this.player);
    //     }
    //   },
    // });

    // Collision between Hallway and Player
    this.physics.add.collider(this.player, this.hallway);
    this.physics.add.collider(this.player, this.topWall);
    this.physics.add.collider(this.player, this.bottomWall);

    // Boss and Player collision
    this.physics.add.collider(this.player, this.boss);

    EventBus.emit("current-scene-ready", this);
  }

  startNextPhase() {
    if (this.phaseActive) return;
    this.phaseActive = true;

    switch (this.currentPhase) {
      case 1:
        this.runPhase1();
        break;

      case 2:
        this.runPhase2();
        break;

      case 3:
        this.runPhase3();
        break;
    }
  }

  runPhase1() {
    let cycleCount = 0;

    const runCycle = () => {
      // Running 3 drop circle mechanics first
      this.time.addEvent({
        delay: 8000,
        repeat: 2,
        callback: () => {
          this.boss.startDropCircleMechanic(this.player);
        },
      });

      // A soak mechanic after the 3 drop circles
      this.time.delayedCall(32000, () => {
        this.boss.startSoakMechanic(this.player);
      });

      // KillSweep after soak mechanic
      this.time.delayedCall(38000, () => {
        this.boss.startKillSweep(this.player);
      });

      // End of cycle. Repeat then next phase
      this.time.delayedCall(38000, () => {
        cycleCount++;

        if (cycleCount < 2) {
          runCycle();
        } else {
          this.currentPhase = 2;
          this.phaseActive = false;
          this.startNextPhase();
        }
      });
    };

    runCycle();
  }

  update() {
    //parallax scroll with background
    this.bg.tilePositionX = this.cameras.main.scrollX * 0.2;

    // updates player
    if (this.player) this.player.update();

    //updates boss
    if (this.boss) this.boss.update();

    // update the kill line laser wall position to boss
    if (this.killLine) this.killLine.update(this.boss);
  }

  changeScene() {
    this.scene.start("GameOver");
  }
}
