/* Miles Anderson
    Title: BLAST EM!
    Time Taken: 20 hours 
    
    Creative Tilt:
    -
    -
    -
 
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

