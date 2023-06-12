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
        // place tile sprite background assets
        this.background = this.add.tileSprite(0, 0, 840, 545, 'background').setOrigin(0, 0);
        this.whiterays = this.add.tileSprite(0, 0, 840, 545, 'whiterays').setOrigin(0, 0);
        this.purplepanel = this.add.tileSprite(0, 0, 840, 545, 'purplepanel').setOrigin(0, 0);
        this.redpanel = this.add.tileSprite(0, 0, 840, 545, 'redpanel').setOrigin(0, 0);
        this.yellowpanel = this.add.tileSprite(0, 0, 840, 545, 'yellowpanel').setOrigin(0, 0);
        // white UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0xffffff).setOrigin(0, 0);
        // // black borders
        // this.add.rectangle(0, 0, game.config.width, borderUISize, 0x000000).setOrigin(0 ,0);
        // this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0x000000).setOrigin(0 ,0);
        // this.add.rectangle(0, 0, borderUISize, game.config.height, 0x000000).setOrigin(0 ,0);
        // this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0x000000).setOrigin(0 ,0);

        // add Player
        this.player = new Player(this, game.config.width/8, game.config.height/4, 'player').setOrigin(0.5, 0);

        // ANIMATION CONFIG
        // laser shooting animation
        this.anims.create({
            key: 'shoot',
            frames: this.anims.generateFrameNumbers('shoot', { 
                start: 0, 
                end: 4, 
                first: 0
                
            }),
            frameRate: 30
        });
        // player death animation
        this.anims.create({
            key: 'playerdeath',
            frames: this.anims.generateFrameNumbers('playerdeath', { 
                start: 0, 
                end: 5, 
                first: 0
                
            }),
            frameRate: 30
        });
        // enemy death animation
        this.anims.create({
            key: 'enemydeath',
            frames: this.anims.generateFrameNumbers('enemydeath', { 
                start: 0, 
                end: 5, 
                first: 0
                
            }),
            frameRate: 30
        });

        // TEXTURE ATLAS ANIMS
        // enemy idle atlas
        this.anims.create({
            key: 'enemyidle_atlas',
            frames: this.anims.generateFrameNames('enemyidle_atlas', {
                prefix: 'enemy_',
                start: 1,
                end: 4,
            }),
            frameRate: 2,
            repeat: -1
        })
        // bottom monolith atlas
        this.anims.create({
            key: 'bottommonolith_atlas',
            frames: this.anims.generateFrameNames('bottommonolith_atlas', {
                prefix: 'BottomMonolith_',
                start: 1,
                end: 4,
            }),
            frameRate: 4,
            repeat: -1
        })
        // top monolith atlas
        this.anims.create({
            key: 'topmonolith_atlas',
            frames: this.anims.generateFrameNames('topmonolith_atlas', {
                prefix: 'TopMonolith_',
                start: 1,
                end: 4,
            }),
            frameRate: 4,
            repeat: -1
        })

        // add enemies
        
        // Intialize Random Monolith Generator variables
        // credit:
        this.monoliths = this.physics.add.group();
        this.monolithInterval = 2000; // Time (in milliseconds) between pipe generation
        this.monolithTimer = this.time.addEvent({
            delay:  this.monolithInterval,
            callback: this.createMonolith,
            callbackScope: this,
            loop: true
        });

        // SET UP KEYBOARD INPUT
        // console.log('initializing keys');
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        // console.log('keys initialized');

        // initialize score
        // this.p1Score = 0;
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
        // this.gameOver = false;

    }
    // Monolith generator group
    // credit: 
    createMonolith() {
        var monolithVerticalDistance = Phaser.Math.Between(135, 365); // Distance between the monoliths vertically
        var monolithHorizontalDistance = 150; // Distance between the monoliths horizontally
        var monolithTopHeight = Phaser.Math.Between(50, 250); // Height of the top monolith

        // set up Top Monolith
        var monolithTop = this.physics.add.sprite(this.game.config.width, monolithTopHeight, 'topmonolith_atlas');
        monolithTop.setOrigin(0, 1); // Set origin to the bottom left
        monolithTop.body.velocity.x = -200; // set the horizontal velocity
        monolithTop.body.allowGravity = false; // Disable gravity

        var monolithBottom = this.physics.add.sprite(this.game.config.width, monolithTopHeight + monolithVerticalDistance, 'bottommonolith_atlas');
        monolithBottom.setOrigin(0, 0); // Set origin to the bottom left
        monolithBottom.body.velocity.x = -200; // set the horizontal velocity
        monolithBottom.body.allowGravity = false; // Disable gravity

        // Add monoliths to the group
        this.monoliths.add(monolithTop);
        this.monoliths.add(monolithBottom);

    }
    update() {
        // BG parallax scrolling
        this.yellowpanel.tilePositionX += 18;
        this.redpanel.tilePositionX += 12;
        this.purplepanel.tilePositionX += 9.5;
        this.whiterays.tilePositionX += 20;
        this.player.update();
    
        // Update monolith positions
        this.monoliths.getChildren().forEach(function (monolith) {
            if (monolith.getBounds().right < 0) {
            // If the pipe has moved off the screen, destroy it
            monolith.destroy();
            }
        });
          
        // if(!this.gameOver) {
        //     this.player.update(); // update p1
        // }

        // if(this.gameOver) {
            
        // }
    }
}