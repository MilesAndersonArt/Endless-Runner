class Tutorial extends Phaser.Scene {
    constructor() {
        super("tutorialScene_3");
    }

    preload(){

    }

    create() {
        // Points Instructions

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }
    
    update() {
        
    }
}