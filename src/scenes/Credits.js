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
            backgroundColor: '#fcc603',
            color: '#000000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.add.text(game.config.width/2 + 150, game.config.height/2 + borderUISize*2 + borderPadding*2 + 60, 'Page 1', menuConfig).setOrigin(0.5);
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