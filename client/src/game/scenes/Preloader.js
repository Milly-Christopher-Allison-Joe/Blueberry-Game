import { Scene } from "phaser";
import background from "../../assets/background.jpg";
import buttonSprite from "../../assets/button-sprite/buttonSprite.png";
import mainButton from "../../assets/button-sprite/mainButton.png";

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

    //main button sprite

    this.load.image("mainButton", mainButton);

    // load start button asset
    this.load.image("buttonSprite", buttonSprite);
  }

  create() {
    this.scene.start("MainMenu");
  }
}
