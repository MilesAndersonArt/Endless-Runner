class Tutorial_1 extends Phaser.Scene {
    constructor() {
        super("tutorialScene_1");
    }

    preload(){

    }

    create() {
        // Player Control instructions
        let menuConfig = {
            fontFamily: 'Courier New',
            fontSize: '28px',
            backgroundColor: '#FFFFFF',
            color: '#000000',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.add.text(game.config.width/2, game.config.height/2 - 180, 'INSTRUCTIONS', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Use Arrow Keys to Move', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 180, 'Use Spacebar to Shoot', menuConfig).setOrigin(0.5);
    
        menuConfig.backgroundColor = '#fcc603'
        menuConfig.color = '#000';
        this.add.text(game.config.width/2 - 300, game.config.height/2 + 120, '← Back', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2 + 300, game.config.height/2 + 120, 'Next →', menuConfig).setOrigin(0.5);
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    
    }
    
    update() {
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.sound.play('sfx_shoot');
            this.scene.start("menuScene");
          }
        else if(Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            this.sound.play('sfx_shoot');
            this.scene.start("tutorialScene_2");
          }
    }
}