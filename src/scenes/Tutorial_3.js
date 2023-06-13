class Tutorial_3 extends Phaser.Scene {
    constructor() {
        super("tutorialScene_3");
    }

    preload(){

    }

    create() {
        // Points Instructions
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
        this.add.text(game.config.width/2, game.config.height/2 - 180, 'SCORING', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - 95, 'The game is endless.', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - 55, 'You are scored by how long', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - 15, 'you last in the Stargate', menuConfig).setOrigin(0.5);

        this.add.text(game.config.width/2, game.config.height/2 + 50, 'Shooting Diamonds are worth 300 points', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 150, 'Press Spacebar to Start', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 200, "...and may God's love be with you", menuConfig).setOrigin(0.5);

        menuConfig.backgroundColor = '#fcc603'
        menuConfig.color = '#000';
        this.add.text(game.config.width/2 - 300, game.config.height/2 + 120, '← Back', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2 + 300, game.config.height/2 + 120, 'Menu →', menuConfig).setOrigin(0.5);
    
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
    
    update() {
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.sound.play('sfx_shoot');
            this.scene.start("tutorialScene_2");
          }
        else if(Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            this.sound.play('sfx_shoot');
            this.scene.start("menuScene");
          }
        else if(Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.sound.play('sfx_shoot');
            this.scene.start("playScene");
          }
    }
}