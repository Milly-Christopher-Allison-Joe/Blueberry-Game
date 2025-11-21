export class GameTimer {
  constructor(scene) {
    this.scene = scene;

    // Storing the scene key like "Plexus"
    this.sceneKey = scene.sys.settings.key;

    // time in milliseconds
    this.elapsed = 0;

    // flag to control if the time is running
    this.running = false;

    // tick every X ms for the timer increments
    this.tickEvent = null;

    this.tickEvent = scene.time.addEvent({
      delay: 100,
      loop: true,
      callback: () => {
        if (this.running) {
          this.elapsed += 100;

          if (this.text) {
            this.text.setText(this.formatTime(this.elapsed));
          }
        }
      },
    });

    // The visual timer itself
    this.text = null;

    this.text = scene.add.text(110, 75, "00:00.0", {
      fontSize: "32px",
      fontFamily: "Pixelify Sans",
      color: "#ffffff",
    });
    this.text.setScrollFactor(0); // locks it to the screen
    this.text.setOrigin(0, 0); // puts the timer in the right spot
    this.text.setDepth(1000); // make sure it's always visible above the gameplay
  }

  formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const tenths = Math.floor((ms % 1000) / 100);

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}.${tenths}`;
  }

  start() {
    this.running = true;
  }

  stop() {
    this.running = false;
  }

  saveToRegistry() {
    // const reg = this.scene.game.registry; // Global registry

    this.scene.registry.set("runTime", this.elapsed);
    this.scene.registry.set("runScene", this.sceneKey);
  }
}
