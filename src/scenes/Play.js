class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load player sprite
        this.load.image('player', './assets/player/Pod.png');

        // scrolling tile sprites / parallax
        this.load.image('background', './assets/bg/background.png');
        this.load.image('whiterays', './assets/bg/whiterays.png');
        this.load.image('purplepanel', './assets/bg/purplepanel.png');
        this.load.image('redpanel', './assets/bg/redpanel.png');
        this.load.image('yellowpanel', './assets/bg/yellowpanel.png');

        // load spritesheet
        this.load.spritesheet('shoot', './assets/anim/png/PodShoot_Anim.png', {frameWidth: 65, frameHeight: 65, startFrame: 0, endFrame: 4});
        this.load.spritesheet('playerdeath', './assets/anim/png/DeathAnim.png', {frameWidth: 86, frameHeight: 54, startFrame: 0, endFrame: 5});
        this.load.spritesheet('enemydeath', './assets/anim/png/EnemyDeath_Anim.png', {frameWidth: 51, frameHeight: 51, startFrame: 0, endFrame: 7});

        // load texture atlas
        this.load.atlas('enemyidle_atlas', './assets/anim/png/diamondenemyidle.png', 'assets/anim/json/enemyidle.json');
        this.load.atlas('bottommonolith_atlas', './assets/anim/png/BottomMonolith_Anim.png', 'assets/anim/json/BottomMonolith.json');
        this.load.atlas('topmonolith_atlas', './assets/anim/png/TopMonolith_Anim.png', 'assets/anim/json/TopMonolith.json');
    }

    create() {
        // place tile sprite background
        this.yellowpanel = this.add.tileSprite(0, 0, 840, 545, 'yellowpanel').setOrigin(0, 0);
        // this.yellowpanel.setInteractive();
        this.redpanel = this.add.tileSprite(0, 0, 840, 545, 'redpanel').setOrigin(0, 0);
        // this.redpanel.setInteractive();
        this.purplepanel = this.add.tileSprite(0, 0, 840, 545, 'purplepanel').setOrigin(0, 0);
        // this.purplepanel.setInteractive();
        this.whiterays = this.add.tileSprite(0, 0, 840, 545, 'whiterays').setOrigin(0, 0);
        // this.whiterays.setInteractive();
        this.background = this.add.tileSprite(0, 0, 840, 545, 'background').setOrigin(0, 0);
        // this.background.setInteractive();


        // white UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0xffffff).setOrigin(0, 0);
        // black borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0x000000).setOrigin(0 ,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0x000000).setOrigin(0 ,0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0x000000).setOrigin(0 ,0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0x000000).setOrigin(0 ,0);

        // add Player
        //this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);
        this.player = new this.Player(this, game.config.width/8, game.config.height/4, 'player');

        // animation config

        // this.anims.create({
        //     key: 'explode',
        //     frames: this.anims.generateFrameNumbers('explosion', { 
        //         start: 0, 
        //         end: 9, 
        //         first: 0
                
        //     }),
        //     frameRate: 30
        // });

        // this.anims.create({
        //     key: 'bonus_explode',
        //     frames: this.anims.generateFrameNumbers('bonus_explosion', { 
        //         start: 0, 
        //         end: 1, 
        //         first: 0
                
        //     }),
        //     frameRate: 30
        // });

        // texture atlas anims

        // this.anims.create({
        //     key: 'creature',
        //     frames: this.anims.generateFrameNames('creature1idleatlas', {
        //         prefix: 'creatureidle(',
        //         start: 1,
        //         end: 4,
        //         suffix: ')'
        //     }),
        //     frameRate: 4,
        //     repeat: -1
        // })

        // this.anims.create({
        //     key: 'bonus',
        //     frames: this.anims.generateFrameNames('bonusatlas', {
        //         prefix: 'BonusShip(',
        //         start: 1,
        //         end: 2,
        //         suffix: ')'
        //     }),
        //     frameRate: 2,
        //     repeat: -1
        // })

        // add enemies
        
        // set up keyboard input
        //this.cursors = this.input.keyboard.createCursorKeys();
        // define keys
        //keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


        // initialize score
        this.p1Score = 0;
        // display score
        let scoreConfig = {
            fontFamily: 'Courier New',
            fontSize: '28px',
            backgroundColor: '#000000',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5, 
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);        
        // GAME OVER flag
        this.gameOver = false;

    }

    update() {
        // BG parallax scrolling
        this.yellowpanel.tilePositionX -= 4;
        this.redpanel.tilePositionX -= 5;
        this.purplepanel.tilePositionX -= 6.5;
        this.whiteray.tilePositionX -= 7.25;

        // check key input for restart / menu
        // if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
        //     highscore = Math.max(this.p1Score)
        //     this.scene.restart();
        //     this.gameOver = false;
        //     // this.accelerationTrigger = true;
        //     timer = 60000;
        // }

        // if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
        //     highscore = Math.max(this.p1Score)
        //     this.scene.start("menuScene");
        //     this.gameOver = false;
        //     // this.accelerationTrigger = true;
        //     timer = 60000;
        // }

        // if(!this.gameOver) {
        //     this.player.update();             // update p1

        // }

        // check collisions

    // shipExplode(ship) {
    //     // temporarily hide ship
    //     ship.alpha = 0;                         
    //     // create explosion sprite at ship's position
    //     let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
    //     boom.anims.play('explode');             // play explode animation
    //     boom.on('animationcomplete', () => {    // callback after anim completes
    //         ship.reset();                         // reset ship position
    //         ship.alpha = 1;                       // make ship visible again
    //         boom.destroy();                       // remove explosion sprite
    //     });
    //     // score add and repaint
    //     if(ship.points == 40){
    //         timer += 5000;
    //     }
    //     this.p1Score += ship.points;
    //     this.scoreLeft.text = this.p1Score; 
        
    //     this.sound.play('sfx_explosion');
    //     let test = Math.floor(Math.random() * 4) + 1;
    //     let enemydeathsfx = 'sfx_enemydeath_' + test;
    //     this.sound.play(enemydeathsfx);
    //   }
    
    //   bonusExplode(ship) {
    //     // temporarily hide ship
    //     ship.alpha = 0;                         
    //     // create explosion sprite at ship's position
    //     let boom = this.add.sprite(ship.x, ship.y, 'bonus_explosion').setOrigin(0, 0);
    //     boom.anims.play('bonus_explode');             // play explode animation
    //     boom.on('animationcomplete', () => {    // callback after anim completes
    //         ship.reset();                         // reset ship position
    //         ship.alpha = 1;                       // make ship visible again
    //         boom.destroy();                       // remove explosion sprite
    //     });
    //     // score add and repaint
    //     if(ship.points == 40){
    //         timer += 5000;
    //     }
    //     this.p1Score += ship.points;
    //     this.scoreLeft.text = this.p1Score;

    //     this.sound.play('sfx_bonus');
    //   }

    }
}