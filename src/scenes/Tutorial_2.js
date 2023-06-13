class Tutorial_2 extends Phaser.Scene {
    constructor() {
        super("tutorialScene_2");
    }

    preload(){

    }

    create() {
        // Obstacles Instructions
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

        this.add.text(game.config.width/2, game.config.height/2 - 180, 'OBSTACLES', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - 95, 'Beware of the Monoliths.', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - 55, 'Make sure to pass the gaps in-between.', menuConfig).setOrigin(0.5);

        this.add.text(game.config.width/2, game.config.height/2 + 25, 'The Diamonds are dangerous.', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 65, 'Blast them if they get in your way.', menuConfig).setOrigin(0.5);


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
            this.scene.start("tutorialScene_1");
          }
        else if(Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            this.sound.play('sfx_shoot');
            this.scene.start("tutorialScene_3");
          }
    }
}