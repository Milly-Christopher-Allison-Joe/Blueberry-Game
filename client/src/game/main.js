import { Boot } from "./scenes/Boot";
import { Plexus } from "./scenes/Plexus";
import { GameOver } from "./scenes/GameOver";
import { MainMenu } from "./scenes/MainMenu";
import Phaser from "phaser";
import { Preloader } from "./scenes/Preloader";
import { BossSelect } from "./scenes/BossSelect";
import { PauseMenu } from "./UI/PauseMenu";
import { Victory } from "./scenes/Victory";

const config = {
  type: Phaser.AUTO,
  width: 1024,
  height: 768,
  parent: "game-container",
  backgroundColor: "#028af8",
  scene: [
    Boot,
    Preloader,
    MainMenu,
    BossSelect,
    Plexus,
    PauseMenu,
    GameOver,
    Victory,
  ],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
};

const StartGame = (parent) => {
  return new Phaser.Game({ ...config, parent });
};

export default StartGame;
