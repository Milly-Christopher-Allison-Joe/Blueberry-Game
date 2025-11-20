import { Scene } from "phaser";

export class BossScene extends Scene {
  constructor(key) {
    super(key);
    this.boss = null;
    this.timer = null;

    // Phase timer list
    this.phaseTimers = [];
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

  changeScene(result) {
    // Stop timer and save timer if exists
    if (this.timer) {
      this.timer.stop();
      this.timer.saveToRegistry();
    }

    // Determine which scene to load
    const target = result === "victory" ? "Victory" : "GameOver";

    this.scene.start(target);
  }
}
