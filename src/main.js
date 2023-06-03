/* Miles Anderson
    Title: BLAST EM!
    Time Taken: 20 hours 
    
    Creative Tilt:
    -
    -
    -
 
    Sources:
    - I borrowed the speed increase code from Nhan Nguyen's Rocket Patrol mod.
        - Credit: https://github.com/Ataru2002/Rocket-Patrol
    - 'enemydeath' sound effects recorded by me through Voice Memos app
    - 'pickupCoin' sound effect created with jsfxr
*/ 

let config = {
    type: Phaser.CANVAS,
    width: 840,
    height: 545,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 400 },
            debug: false
        }
    },
    scene: [ Menu, Play, Tutorial, Credits ]
} // Object literal: Defining an object with specific property values



let game = new Phaser.Game(config);
// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
// set play variables
let timer = 60000;
let highscore = 0;
// reserve keyboard variables
let keyF, keyR, keyLEFT, keyRIGHT, keyUP, keyDOWN, keySPACE;
// reserve mouse input variables
let input;
let cursorx;
let cursory;
let mousedown = false;
