class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene");
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
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.add.text(game.config.width/2, game.config.height/2 - 210, 'CREDITS', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - 150, 'Miles Anderson - Graphics and Programming', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - 90, 'Sound Effects from jsfxr', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - 30, 'Music - “8 Bit Raceway” by Wizwars', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 30, '2001: A Space Odyssey is', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 90, 'owned by Stanley Kubrick', menuConfig).setOrigin(0.5);
        

        menuConfig.backgroundColor = '#fcc603'
        menuConfig.color = '#000';
        this.add.text(game.config.width/2 + 300, game.config.height/2 + 120, 'Back →', menuConfig).setOrigin(0.5);
        // define keys
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }
    
    update() {
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            this.sound.play('sfx_shoot');
            this.scene.start("menuScene");
          }
    }
}