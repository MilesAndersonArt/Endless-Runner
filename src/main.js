/* Miles Anderson
    Title: BLAST EM!
    Time Taken: 22 hours 
    
    Creative Tilt:
    - A technical feature that I was proud of was the random monolith generator in the game, which was based off the random pipe generation mechanic from Flappy Bird.
    - Inspired by Rusty Cage’s song “BLAST EM,” the game is a parodic tribute to the Stargate Sequence from Stanley Kubrick's 1968 film 2001: A Space Odyssey.
      My artistic goal for the project was to subvert the dread tone of the original scene by reframing it as a game invoking feelings of challenge, optimism and excitement.
    - Although a small technical feature, I was proud that I created the collision detection between the laser and the enemy.
 
    Sources:
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

