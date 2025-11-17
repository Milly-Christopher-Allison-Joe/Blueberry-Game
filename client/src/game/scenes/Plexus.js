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

    // This is for the phases so I don't have to rewrite every call of the stuff above
    this.worldWidth = worldWidth;
    this.worldHeight = worldHeight;
    this.hallwayY = hallwayY;
    this.hallwayHeight = hallwayHeight;

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
    this.phaseTimers = [];

    this.startNextPhase();

    // Create the kill line laser wall
    this.killLine = new KillLine(this, bossX + 150, worldHeight / 2);

    // DEBUG: Press P to jump to Phase 2
    this.input.keyboard.on("keydown-P", () => {
      console.warn("DEBUG: Skipping to Phase 2");
      this.currentPhase = 2;
      this.phaseActive = false;
      this.startNextPhase();
    });

    // DEBUG: Press O to jump to Phase 3
    this.input.keyboard.on("keydown-O", () => {
      console.warn("DEBUG: Skipping to Phase 3");
      this.currentPhase = 3;
      this.phaseActive = false;
      this.startNextPhase();
    });

    // Collision between Hallway and Player
    this.physics.add.collider(this.player, this.hallway);
    this.physics.add.collider(this.player, this.topWall);
    this.physics.add.collider(this.player, this.bottomWall);

    // Boss and Player collision
    this.physics.add.collider(this.player, this.boss);

    EventBus.emit("current-scene-ready", this);
  }

  // Managing Timers of Phases
  schedulePhaseEvent(delay, callback) {
    const t = this.time.delayedCall(delay, callback);
    this.phaseTimers.push(t);
    return t;
  }

  schedulePhaseRepeatingEvent(config) {
    const evt = this.time.addEvent(config);
    this.phaseTimers.push(evt);
    return evt;
  }

  clearPhaseTimers() {
    for (const t of this.phaseTimers) {
      t.remove(false);
    }
    this.phaseTimers = [];
  }

  // Setting up the order of phases and the starting of them
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

  // Start of Phase 1 and Timeline sequencing
  runPhase1() {
    let cycleCount = 0;

    const runCycle = () => {
      // Running 3 drop circle mechanics first
      this.schedulePhaseRepeatingEvent({
        delay: 8000,
        repeat: 2,
        callback: () => {
          this.boss.startDropCircleMechanic(this.player);
        },
      });

      // A soak mechanic after the 3 drop circles
      this.schedulePhaseEvent(32000, () => {
        this.boss.startSoakMechanic(this.player);
      });

      // KillSweep after soak mechanic
      this.schedulePhaseEvent(38000, () => {
        this.boss.startKillSweep(this.player);
      });

      // End of cycle. Repeat then next phase
      this.schedulePhaseEvent(41000, () => {
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

  // Starting of Phase 2
  runPhase2() {
    console.log("Phase 2 is starting");

    this.clearPhaseTimers();

    const targetX = this.worldWidth / 2;
    const targetY = this.hallwayY;

    this.boss.moveTo(targetX, targetY, 2000);

    this.schedulePhaseEvent(2200, () => {
      this.startPhase2Timeline();
    });
  }

  // Timeline sequencing of Phase 2 after Boss Movement
  startPhase2Timeline() {
    let cycleCount = 0;

    // spawning a killwall behind the player to block off the arena
    this.schedulePhaseEvent(8000, () => {
      const wallOffSet = 600;

      this.backKillLine = new KillLine(
        this,
        this.boss.x - wallOffSet,
        this.worldHeight / 2
      );
    });

    const runCycle = () => {
      // first kill sweep at 0 seconds as the player follows after the boss
      this.schedulePhaseEvent(0, () => {
        this.boss.startKillSweep(this.player);
      });

      // Three drop circle mechanics at 0, 5, 10 seconds
      this.schedulePhaseEvent(0, () => {
        this.boss.startDropCircleMechanic(this.player);
      });
      this.schedulePhaseEvent(5000, () => {
        this.boss.startDropCircleMechanic(this.player);
      });
      this.schedulePhaseEvent(10000, () => {
        this.boss.startDropCircleMechanic(this.player);
      });

      // soak mechanic at 15 seconds
      this.schedulePhaseEvent(15000, () => {
        this.boss.startSoakMechanic(this.player);
      });

      // kill sweep mechanic at 23 seconds
      this.schedulePhaseEvent(23000, () => {
        this.boss.startKillSweep(this.player);
      });

      // cycle logic
      this.schedulePhaseEvent(25000, () => {
        cycleCount++;

        if (cycleCount < 3) {
          runCycle();
        } else {
          this.currentPhase = 3;
          this.phaseActive = false;
          this.startNextPhase();
        }
      });
    };
    runCycle();
  }

  // Starting of Phase 3
  runPhase3() {
    console.log("Phase 3 is starting");

    this.clearPhaseTimers();

    const targetX = this.worldWidth - 200;
    const targetY = this.hallwayY;

    this.boss.moveTo(targetX, targetY, 2500);

    this.schedulePhaseEvent(1500, () => {
      this.startPhase3Timeline();
    });
  }

  // Timeline of Phase 3 after boss movement
  startPhase3Timeline() {
    let cycleCount = 0;

    // spawning a killwall behind the player to block off the arena
    this.schedulePhaseEvent(9000, () => {
      const wallOffSet = 600;

      this.backKillLine = new KillLine(
        this,
        this.boss.x - wallOffSet,
        this.worldHeight / 2
      );
    });

    const runCycle = () => {
      // Kill sweep at start
      this.schedulePhaseEvent(0, () => {
        this.boss.startKillSweep(this.player);
      });

      // Drop circle at start
      this.schedulePhaseEvent(0, () => {
        this.boss.startDropCircleMechanic(this.player);
      });

      // Soak at 5 seconds
      this.schedulePhaseEvent(5000, () => {
        this.boss.startSoakMechanic(this.player);
      });

      // Drop circle at 8 seconds
      this.schedulePhaseEvent(8000, () => {
        this.boss.startDropCircleMechanic(this.player);
      });

      // Reverse Kill Sweep at 10 seconds
      this.schedulePhaseEvent(10000, () => {
        this.boss.reverseKillSweep(this.player);
      });

      // Drop circle at 13 seconds
      this.schedulePhaseEvent(13000, () => {
        this.boss.startDropCircleMechanic(this.player);
      });

      // Kill sweep at 18 seconds
      this.schedulePhaseEvent(18000, () => {
        this.boss.startKillSweep(this.player);
      });

      // Cycle restart
      this.schedulePhaseEvent(23000, () => {
        cycleCount++;

        if (cycleCount < 4) {
          runCycle();
        } else {
          this.currentPhase = 4;
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
