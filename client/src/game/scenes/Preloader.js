import { Scene } from "phaser";
import background from "../../assets/background.jpg";
import dash from "../../assets/Ability Icons/dash.png";
import heal from "../../assets/Ability Icons/heal.png";
import ranged from "../../assets/Ability Icons/ranged.png";
import slash from "../../assets/Player Attacks/slash.png";

export class Preloader extends Scene {
  constructor() {
    super("Preloader");
  }

  init() {}

  preload() {
    this.width = this.cameras.main.width;
    this.height = this.cameras.main.height;

    // adding the loading bar code
    this.progressBox = this.add.rectangle(
      this.width / 2,
      this.height / 2,
      300,
      30,
      0x222222
    );
    this.progressBar = this.add.rectangle(
      this.width / 2,
      this.height / 2,
      0,
      30,
      0xffffff
    );

    this.load.on("progress", (value) => {
      this.progressBar.width = 300 * value;
    });

    // simple background asset
    this.load.image("background", background);

    // Dash Icon
    this.load.image("dash", dash);

    // Heal Icon
    this.load.image("heal", heal);

    // Ranged icon
    this.load.image("ranged", ranged);

    // Player Slash Animation
    this.load.spritesheet("melee", slash, {
      frameWidth: 30,
      frameHeight: 76,
    });
  }

  create() {
    this.scene.start("MainMenu");
  }
}
