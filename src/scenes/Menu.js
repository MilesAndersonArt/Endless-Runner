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
        // reset music loop
        this.game.sound.stopAll();
        // set up music loop
        this.bgMusic = this.sound.add('bg_music');
        this.bgMusic.setLoop(true);
        this.bgMusic.play();
        
        // show menu text
        //this.title = this.add.sprite(game.config.width/2, game.config.height/2, 'Title');
        this.add.text(game.config.width/2 + 150, game.config.height/2 + borderUISize*2 + borderPadding*2 + 60, 'HIGH SCORE:' + highscore, menuConfig).setOrigin(0.5);

        // setting up player cursor
        sceneSelect = "playScene";
        // define keys
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.playbutton = this.add.text(game.config.width/2, game.config.height/2 + 64, 'Play', menuConfig).setOrigin(0.5);
        this.tutorialbutton = this.add.text(game.config.width/2, game.config.height/2 + 96, 'Tutorial', menuConfig).setOrigin(0.5);
        this.creditsbutton = this.add.text(game.config.width/2, game.config.height/2 + 128, 'Credits', menuConfig).setOrigin(0.5);

    }

    update() {
      if (Phaser.Input.Keyboard.JustDown(keyDOWN)) {
        if(sceneSelect == "playScene") {
          this.updateMenu(this.playbutton, this.tutorialbutton, "tutorialScene_1");
        }
        else if(sceneSelect == "tutorialScene_1") {
          this.updateMenu(this.tutorialbutton, this.creditsbutton, "creditsScene");
        }
        else if(sceneSelect == "creditsScene") {
          this.updateMenu(this.creditsbutton, this.playbutton, "playScene");
        }
      }
        if (Phaser.Input.Keyboard.JustDown(keyUP)) {
          if(sceneSelect == "playScene") {
            this.updateMenu(this.playbutton, this.creditsbutton, "creditsScene");
          }
          else if(sceneSelect == "tutorialScene_1") {
            this.updateMenu(this.tutorialbutton, this.playbutton, "playScene");
          }
          else if(sceneSelect == "creditsScene") {
            this.updateMenu(this.creditsbutton, this.tutorialbutton, "tutorialScene_1");
          }
        }
        if(Phaser.Input.Keyboard.JustDown(keySPACE)) {
          this.sound.play('sfx_shoot');
          this.scene.start(sceneSelect);
        }

  }
  updateMenu(current, next, scene){
    current.setColor('#F5c827');
    current.setShadowBlur(0);
    next.setColor('#FFFFFF');
    next.setShadowBlur(10);
    sceneSelect = scene;
  }
  
}