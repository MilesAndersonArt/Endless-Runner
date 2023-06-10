class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        //this.load.image('Title', './assets/Title.png');

        // load bg music
        this.load.audio('bg_music', './assets/sound/8BitRaceway.mp3');

        //load sfx
        this.load.audio('sfx_explosion1', './assets/sound/explosion_1.wav');
        this.load.audio('sfx_explosion2', './assets/sound/explosion_2.wav');
        this.load.audio('sfx_explosion3', './assets/sound/explosion_3.wav');
        this.load.audio('sfx_explosion4', './assets/sound/explosion_4.wav');
        this.load.audio('sfx_explosion5', './assets/sound/explosion_5.wav');

        this.load.audio('sfx_death', './assets/sound/explosion_death.wav');
        this.load.audio('sfx_shoot', './assets/sound/laserShoot.wav');

    }

    create() {
        // menu text configuration
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

        // loop music
        var bgMusic = this.sound.add('bg_music', {volume: 0.6});
        bgMusic.setLoop(true);
        bgMusic.play();
        
        // show menu text
        this.title = this.add.sprite(game.config.width/2, game.config.height/2, 'Title');
        this.add.text(game.config.width/2 + 150, game.config.height/2 + borderUISize*2 + borderPadding*2 + 60, 'HIGH SCORE:' + highscore, menuConfig).setOrigin(0.5);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000
          }
          timer = 60000
          this.sound.play('sfx_select');
          this.scene.start("playScene");    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard mode
          game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 45000  
          }
          timer = 45000
          this.sound.play('sfx_select');
          this.scene.start("playScene");    
        }
  }
}