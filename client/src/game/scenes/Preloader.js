import { Scene } from "phaser";
import background from "../../assets/background.jpg";
import victorySprite from "../../assets/button-sprite/victorySprite.png";
import buttonSprite from "../../assets/button-sprite/buttonSprite.png";
import mainButton from "../../assets/button-sprite/mainButton.png";
import overButton from "../../assets/button-sprite/overButton.png";
import dash from "../../assets/abilityIcons/dash.png";
import heal from "../../assets/abilityIcons/heal.png";
import ranged from "../../assets/abilityIcons/ranged.png";
import bordericon from "../../assets/abilityIcons/Border1.png";
import slash from "../../assets/playerAttacks/Slash.png";
import rangedattack from "../../assets/playerAttacks/rangedattack.png";
import KSbeam from "../../assets/bossAttacks/KSbeam.png";
import KSstart from "../../assets/bossAttacks/KSstart.png";
import KLbeam from "../../assets/bossAttacks/KLbeam.png";
import dropRing from "../../assets/bossAttacks/dropRing.png";
import soakRing from "../../assets/bossAttacks/soakRing.png";
import TileBorder from "../../assets/sceneTextures/IndustrialTile_05.png";
import TileSet from "../../assets/sceneTextures/IndustrialTile_14.png";
import Q from "../../assets/keyboardIcons/Q.png";
import F from "../../assets/keyboardIcons/F.png";
import SPACE from "../../assets/keyboardIcons/SPACEALTERNATIVE.png";
import Player from "../../assets/characterAssets/Player.png";
import PlexusSprite from "../../assets/characterAssets/plexus.png";
import PlexusTheme from "../../assets/audioTracks/PlexusTheme.mp3";

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

    // Keyboard Icons for Cooldowns
    this.load.image("Qkey", Q);
    this.load.image("Fkey", F);
    this.load.image("SPACEkey", SPACE);

    // Player Sprite
    this.load.spritesheet("player", Player, {
      frameWidth: 338,
      frameHeight: 478,
    });

    // Boss Sprite
    this.load.spritesheet("PlexusSprite", PlexusSprite, {
      frameWidth: 1024,
      frameHeight: 1023,
    });

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

    // Audio track for Plexus Boss
    this.load.audio("plexusTheme", PlexusTheme);
  }

  create() {
    this.scene.start("MainMenu");
  }
}
