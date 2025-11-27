import { Scene } from "phaser";
import background from "../../assets/background.jpg";
import victorySprite from "../../assets/button-sprite/victorySprite.png";
import buttonSprite from "../../assets/button-sprite/buttonSprite.png";
import mainButton from "../../assets/button-sprite/mainButton.png";
import overButton from "../../assets/button-sprite/overButton.png";
import dash from "../../assets/Ability Icons/dash.png";
import heal from "../../assets/Ability Icons/heal.png";
import ranged from "../../assets/Ability Icons/ranged.png";
import bordericon from "../../assets/Ability Icons/Border1.png";
import slash from "../../assets/Player Attacks/slash.png";
import rangedattack from "../../assets/Player Attacks/rangedattack.png";
import KSbeam from "../../assets/boss attacks/KSbeam.png";
import KSstart from "../../assets/boss attacks/KSstart.png";
import KLbeam from "../../assets/boss attacks/KLbeam.png";
import dropRing from "../../assets/boss attacks/dropRing.png";
import soakRing from "../../assets/boss attacks/soakRing.png";
import TileBorder from "../../assets/scene textures/IndustrialTile_05.png";
import TileSet from "../../assets/scene textures/IndustrialTile_14.png";

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

    // victory sprite
    this.load.image("victorySprite", victorySprite);

    //game over sprite
    this.load.image("overButton", overButton);

    // load start button asset
    this.load.image("buttonSprite", buttonSprite);
    //Plexus Hallway
    this.load.image("hallBorder", TileBorder);
    this.load.image("hallFill", TileSet);

    // Dash Icon
    this.load.image("dash", dash);

    // Heal Icon
    this.load.image("heal", heal);

    // Ranged icon
    this.load.image("ranged", ranged);

    // Icon border
    this.load.image("bordericon", bordericon);

    // Player Slash Animation
    this.load.spritesheet("melee", slash, {
      frameWidth: 30,
      frameHeight: 76,
    });

    // Player ranged attack projectile
    this.load.spritesheet("rangedattack", rangedattack, {
      frameWidth: 32,
      frameHeight: 32,
    });

    // Boss Kill Sweep Attack
    this.load.spritesheet("KSbeam", KSbeam, {
      frameWidth: 16,
      frameHeight: 10,
    });

    this.load.spritesheet("KSstart", KSstart, {
      frameWidth: 16,
      frameHeight: 14,
    });

    // Boss Kill Line Beam
    this.load.spritesheet("KLbeam", KLbeam, {
      frameWidth: 16,
      frameHeight: 10,
    });

    // Soak Ring
    this.load.spritesheet("soakRing", soakRing, {
      frameWidth: 64,
      frameHeight: 51,
    });

    // Drop ring
    this.load.spritesheet("dropRing", dropRing, {
      frameWidth: 64,
      frameHeight: 57,
    });
  }

  create() {
    this.scene.start("MainMenu");
  }
}
