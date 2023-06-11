class Tutorial extends Phaser.Scene {
    constructor() {
        super("tutorialScene_1");
    }

    preload(){

    }

    create() {
        // Player Control instructions
        
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    
    }
    
    update() {
        
    }
}