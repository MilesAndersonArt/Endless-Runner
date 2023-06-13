/* Miles Anderson
    Title: BLAST EM!
    Time Taken: 22 hours 
    
    Creative Tilt:
    - Inspired by Rusty Cage’s song “BLAST EM,” the game is a parodic tribute to the Stargate sequence from 2001: A Space Odyssey.
    - As an Endless Runner game, I tried to make a unique challenge for the genre through
      the random monolith generator, the random enemy spawn points, and the shooting mechanic.
      As a result, I was hoping to make a game that was simple, addicting and challenging altogether.
    - An artistic goal I had in mind was to subvert the experience of watching Stargate sequence by
      having the game be more upbeat in contrast to the scene's ominous tone.
    - A technical feature that I was proud of was the random monolith generator in the game.
      Using Thomas Palef's tutorial, I tried to emulate the pipe generator from Flappy Bird because
      I thought it would be an interesting obstacle given the genre.
    - I attempted to make a scoring system based on how much time the player spent playing the game
      (in milliseconds), but the score display turned out to be frustrating in which I decided to 
      leave it be for now.
    - Although a small technical feature, I was proud when I implemented the collision detection between 
      the laser and enemy. For me, it was one of the hardest parts to make.

    Sources:
    - Inspired by "BLAST EM" by Rusty Cage
    - 
*/ 

let config = {
    type: Phaser.CANVAS,
    width: 840,
    height: 545,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 800 },
            debug: false
        }
    },
    scene: [ Menu, Play, Tutorial_1, Tutorial_2, Tutorial_3, Credits ]
}

let game = new Phaser.Game(config);
// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
// for menu selection
let sceneSelect = "playScene";
// set play variables
let highscore = 0;
// reserve keyboard variables
let keyR, keyLEFT, keyRIGHT, keyUP, keyDOWN, keySPACE;

