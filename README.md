## Blueberry Game

### Fun Top Down Shooter Game

Inspired by [Pineapple Game](https://tacticalairhorse.itch.io/nerubar-palace), an browser game designed to help teach people the mechanics of WoW bosses in a safe and fun environment.

### Gameplay Mechanics

Blueberry Game is designed to be a quick to understand game to people already familiar with the basics of video games and especially World of Warcraft. The bosses are directly inspired by bosses from the lastest raids, with the first finished being Plexus Sentinel from Manaforge Omega.

In the game the player will have access to four main ability to fight against the boss and their mechanics that require specific problem solving skills to overcome.

The player has access to a dash that gives them momentary frames of immunity from incoming damage, essential for specific mechanics. A heal that will reliably keep them alive through the whole boss so long as it is managed effenciently. A melee swing which will be the player's core way of dishing out damage. Lastly a ranged fireball that can be used to sneak in a quick burst of damage on a cooldown if the player is forced to move away from the boss.

### Architecture

Blueberry game is built on React for the front end website, Phaser for the game's engine and mechanics, and SQL for the back-end.

The game's logic is handled solely in the front end within a container within React while the backend server is used to store data about a user should they choose to make an account. It's main purpose is to save your best completed time for each boss!

### How to Play!

- Use <kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd> to move.
- <kbd>SPACE</kbd> to dash!
- <kbd>Q</kbd> to heal!
- <kbd>F</kbd> to fire your ranged attack!
- And Left Click to swing your melee attack!

- Make sure you keep an eye out for various boss attacks as well.
  - Damage areas that will hurt you if you stand in them.
  - Zones that must be stood in to remain safe.
  - Mechanics that must use the dash to avoid or perish.
